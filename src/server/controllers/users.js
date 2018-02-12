const axios = require('axios');

const { apiServerIP, authServerIP, dbServerIP } = require('../util');

const getToken = (req) => req.header('Authorization').split('Bearer ').splice(0).join(' ').trim();
const getUserFromToken = async (token) => {
  const user = await axios.get(`${apiServerIP}user`, { headers: { Authorization: `Bearer ${token}`}, withCredentials: true });
  if (user)
    return user.data;
};

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

const convertToOtherUserType = async (req, res, next) => {
  const token = getToken(req);
  const user = await getUserFromToken(token);
  const { type, fields = {} } = req.body;

  const missing = [];
  if (type == null)
    missing.push('type');
  if (missing.length > 0)
    error(`Request did not contain all required parameters. Missing: ${missing}`);

  const convertedUser = await axios.put(`${dbServerIP}user`, {
    email: user.email,
    type,
    fields
  });

  await res.send(convertedUser);
};

const updateUser = async (req, res, next) => {

};

module.exports = { getUser };
