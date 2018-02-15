const axios = require('axios');
const base64 = require('base64-url');
const { google } = require('googleapis');
const plus = google.plus('v1');
const OAuth2Client = google.auth.OAuth2;
const { throwError, authServerIP, dbServerIP } = require('capstone-utils');

const { getToken : getUserToken, getUserFromToken  } = require('./user');

const oauth2Client = new OAuth2Client(
  '660421589652-k537cl8vg3v8imub4culbjon6f20fph6.apps.googleusercontent.com',
  'yYuc3V2fIT4DOfnZXIyhBvsh',
  `http://localhost:3002/oauth`
);

google.options({ auth: oauth2Client });

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

// GET /coURL
const generateURL = async (req, res, next) => {
  const { type = '', redirect = '' } = req.query;
  const user = await getUserFromToken(getUserToken(req));
  // TODO throw error if user wasn't found
  const userID = base64.encode(user._id);
  const userType = base64.encode(user.type);

  await res.status(307).redirect(`${authServerIP}coURL?type=${type}&redirect=${redirect}&userID=${userID}&userType=${userType}`);
}

// GET /coInfo
const getContentOutletInfo = async (req, res, next) => {
  // call getOutletToken to get access token
  const { id } = req.query;
  const tokens = await getOutletToken(id);
  // call setCredentials on the OAuth2Client object with the token
  oauth2Client.setCredentials(tokens);
  const youtube = google.youtube({
    version: 'v3'
  });
  youtube.channels.list({
    "part": "snippet",
    "mine": "true"
  }, (err, data) => {
    if (err) {
      throw err;
    }

    const channelId = data.data.items[0].id;
    const channelLink = `https://www.youtube.com/channel/${channelId}`;
    const profilePicture = data.data.items[0].snippet.thumbnails.default.url;
    const channelName = data.data.items[0].snippet.localized.title;
    const channelInfo = {
      channelName,
      profilePicture,
      channelLink
    }

    return await res.send({ channelInfo });
  });
}

// GET /outlet
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
};

// POST /outlet
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

// PATCH /outlet
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
