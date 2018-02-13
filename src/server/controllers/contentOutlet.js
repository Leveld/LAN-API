const axios = require('axios');
const { throwError, authServerIP, dbServerIP } = require('capstone-utils');

const { getToken : getUserToken } = require('./user');

const getOutletToken = async (contentOutlet) => {
  let token = await axios.get(`${authServerIP}cotoken`, {
    params: {
      contentOutlet
    }
  });

  if (!token || !token.data || !token.data.token)
    throwError('DBContentOutlet', 'No token found for specified contentOutlet');

  token = token.data;
  return token.token;
};

const getOutlet = async (req, res, next) => {
  const token = getUserToken(req);
  if (!token)
    throwError('APIAuthenticationError', 'Missing Authentication');

  const { id } = req.query;

  let contentToken = null;

  try {
    contentToken = await getOutletToken(id);
  } catch (error) {}

  let outlet = await axios.get(`${dbServerIP}cotoken`, {
    params: {
      id
    }
  });

  if (typeof outlet !== 'object' || outlet === null || typeof outlet.data !== 'object' || outlet.data === null)
    throwError('APICOError', `Unable to find outlet '${id}'`);

  outlet = outlet.data;

  Object.assign(outlet, { accessToken: contentToken });

  await res.send(outlet);

//   {
//    username: 'bob',
//     channelID: 'laksdjflkajsldkfjalskdjfsa',
//     profilePicture: 'google.com/aslkdjflaksjdflaksjdf',
//     channelURL: 'youtube.com/bob',
//     owner: {
//      ownerID: 'alksdjfiwjleikfjlaisjdfljwe',
//       ownerType: 'Business'
//     },
//    accessToken: <retrieve the token>
//   }
};

const createOutlet = async (req, res, next) => {
  const { fields } = req.body;
  if (typeof fields !== 'object')
    throwError('DBContentOutlet', `Missing parameter 'fields'`);
  const outlet = axios.post(`${dbServerIP}cotoken`, {
    fields
  });

  if (typeof outlet !== 'object' || outlet === null || typeof outlet.data !== 'object' || outlet.data === null)
    throwError('APICOError', `Unable to find outlet '${id}'`);

  outlet = outlet.data;

  await res.send(outlet);
};

const updateOutlet = async (req, res, next) => {
  const { id, fields } = req.body;
  if (typeof id !== 'string')
    throwError('DBContentOutlet', `Missing parameter 'id'`);
  if (typeof fields !== 'object')
    throwError('DBContentOutlet', `Missing parameter 'fields'`);
  const outlet = axios.patch(`${dbServerIP}cotoken`, {
    id,
    fields
  });

  if (typeof outlet !== 'object' || outlet === null || typeof outlet.data !== 'object' || outlet.data === null)
    throwError('APICOError', `Unable to find outlet '${id}'`);

  outlet = outlet.data;

  await res.send(outlet);
};

module.exports {
  getOutlet,
  createOutlet,
  updateOutlet,
  getOutletToken
};
