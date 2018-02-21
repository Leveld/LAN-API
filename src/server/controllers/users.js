const axios = require('axios');

const { apiServerIP, authServerIP, dbServerIP, throwError } = require('capstone-utils');
const getToken = (req) => req.header('Authorization') ? req.header('Authorization').split('Bearer ').splice(0).join(' ').trim() : undefined;
const getUserFromToken = async (token) => {
  const user = await axios.get(`${apiServerIP}user`, { headers: { Authorization: `Bearer ${token}`}, withCredentials: true });
  if (user)
    return user.data;
};

// GET /user
const getUser = async (req, res, next) => {
  const token = getToken(req);
  const { id : userID, type: userType} = req.query;

  let auth = await axios.get(`${authServerIP}token?token=${token}`);
  if (auth)
    auth = auth.data;

  let tokenData, userData, expires, id, type;

  if (!userID) {
    (() => {
      const { token = {}, user = {} } = auth;
      const { expires : exp } = token;
      const { userID, accountType } = user;
      tokenData = token;
      userData = user;
      expires = exp;
      id = userID;
      type = accountType;
    })();
  }

  let user = await axios.get(`${dbServerIP}user?id=${id ? id : userID}&type=${type ? type : userType}`);
  if (user)
    user = user.data;

  await res.send(user);
};

// PUT /user
const convertToOtherUserType = async (req, res, next) => {
  const token = getToken(req);
  const user = await getUserFromToken(token);
  if(!user)
    throwError('APIUserError', 'Could not find user.');

  const { type, fields = {} } = req.body;

  const missing = [];

  if (type == null)
    missing.push('type');

  if (missing.length > 0)
    throwError('APIUserError', `Request did not contain all required parameters. Missing: ${missing}`);

  let convertedUser = await axios.put(`${dbServerIP}user`, {
    email: user.email,
    type,
    fields
  });

  if (convertedUser)
    convertedUser = convertedUser.data

  console.log(`${dbServerIP}user`)
  console.log(convertedUser)
  console.log(`convertedUser._id: ${convertedUser._id} | convertedUser.type: ${convertedUser.type}`)

  await axios.patch(`${authServerIP}token`, {
    token,
    fields: {
      user: {
        userID: convertedUser._id,
        accountType: convertedUser.type
      }
    }
  });

  await res.send(convertedUser);
};

// PATCH /user
const updateUser = async (req, res, next) => {
  const { fields } = req.body;

  if(typeof fields !== 'object')
    throwError('APIUserError', 'Must provide fields to update.');

  const token = getToken(req);
  const user = await getUserFromToken(token);
  if(!user)
    throwError('APIUserError', 'Could not find user.');

  let updatedUser = await axios.patch(`${dbServerIP}user`, {
    id: user._id,
    type: user.type,
    fields
  });

  if (updatedUser)
    updatedUser = updatedUser.data;

  await res.send(updatedUser);
};

// PATCH /user/co
const addContentOutlet = async (req, res, next) => {
  const { contentOutlet } = req.body;

  if(typeof contentOutlet !== 'string')
    throwError('APIUserError', 'Must provide contentOutet id');

  const token = getToken(req);
  const user = await getUserFromToken(token);
  if(!user)
    throwError('APIUserError', 'Could not find user.');

  let updatedUser = await axios.patch(`${dbServerIP}user/co`, {
    id: user._id,
    type: user.type,
    contentOutlet
  });

  if (updatedUser)
    updatedUser = updatedUser.data;

  await res.send(updatedUser);
}

module.exports = {
  getUser,
  convertToOtherUserType,
  getToken,
  getUserFromToken,
  updateUser,
  addContentOutlet
};
