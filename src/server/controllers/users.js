const axios = require('axios');

const { apiServerIP, authServerIP, dbServerIP } = require('capstone-utils');
const getToken = (req) => req.header('Authorization') ? req.header('Authorization').split('Bearer ').splice(0).join(' ').trim() : undefined;
const getUserFromToken = async (token) => {
  const user = await axios.get(`${apiServerIP}user`, { headers: { Authorization: `Bearer ${token}`}, withCredentials: true });
  if (user)
    return user.data;
};

// GET /user
const getUser = async (req, res, next) => {
  const token = getToken(req);

  console.log(token);
  let auth = await axios.get(`${authServerIP}token?token=${token}`);
  if (auth)
    auth = auth.data;

  const { token : tokenData = {}, user : userData = {} } = auth;
  const { expires } = tokenData;
  const { userID : id, accountType : type } = userData;

  let user = await axios.get(`${dbServerIP}user?id=${id}&type=${type}`);
  if (user)
    user = user.data;

  await res.send(user);
};

// PUT /user
const convertToOtherUserType = async (req, res, next) => {
  const token = getToken(req);
  const user = await getUserFromToken(token);
  const { type, fields = {} } = req.body;

  const missing = [];

  if (type == null)
    missing.push('type');

  if (missing.length > 0)
    error(`Request did not contain all required parameters. Missing: ${missing}`);

  let convertedUser = await axios.put(`${dbServerIP}user`, {
    email: user.email,
    type,
    fields
  });

  if (convertedUser)
    convertedUser = convertedUser.data

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
    error(`Must provide fields to update`);

  const token = getToken(req);
  const user = await getUserFromToken(token);

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
    error(`Must provide contentOutet id`);

  const token = getToken(req);
  const user = await getUserFromToken(token);

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
