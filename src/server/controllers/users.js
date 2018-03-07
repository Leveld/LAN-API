const axios = require('axios');
const cachios = require('cachios');

const { apiServerIP, authServerIP, dbServerIP, throwError } = require('capstone-utils');

// GET /user
const getUser = async (req, res, next) => {
  const token = req.authToken;
  const { id : userID, type: userType} = req.query;

  let auth = await cachios.get(`${authServerIP}token?token=${token}`, { ttl: 10});
  if (auth)
    auth = auth.data;

  let tokenData, userData, expires, id, type;

  if (!userID || !res) {
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

  if (res)
    await res.send(user);
  return user;
};

// PUT /user
const convertToOtherUserType = async (req, res, next) => {
  const token = req.authToken;
  const user = req.authedUser;
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
    fields: Object.assign({}, user, fields)
  });

  if (convertedUser)
    convertedUser = convertedUser.data

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

  const token = req.authToken;
  const user = req.authedUser;
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
  const token = req.authToken;
  const { contentOutlet } = req.body;

  if(typeof contentOutlet !== 'string')
    throwError('APIUserError', 'Must provide contentOutet id');

  const user = req.authedUser;
  if(!user)
    throwError('APIUserError', 'Could not find user.');

  let updatedUser = await axios.patch(`${dbServerIP}user/co`, {
    id: user.id,
    type: user.type,
    contentOutlet
  });

  if (updatedUser)
    updatedUser = updatedUser.data;

  await res.send(updatedUser);
}

// GET /users
const getUsers = async (req, res, next) => {
  const { type } = req.query;

  let users = await axios.get(`${dbServerIP}users`, {
    params: {
      type
    }
  });

  if (users)
    users = users.data;

  await res.send(users);
};

module.exports = {
  getUser,
  convertToOtherUserType,
  updateUser,
  addContentOutlet,
  getUsers
};
