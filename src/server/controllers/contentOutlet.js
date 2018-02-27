const axios = require('axios');
const base64 = require('base64-url');
const { google } = require('googleapis');
const plus = google.plus('v1');
const OAuth2Client = google.auth.OAuth2;
const { throwError, authServerIP, dbServerIP, googleRedirect } = require('capstone-utils');
const {googleClientID, googleClientSecret} = require('../secret.json');

const { getToken : getUserToken, getUserFromToken  } = require('./users');

const oauth2Client = new OAuth2Client(
  googleClientID,
  googleClientSecret,
  googleRedirect
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
  return { accessToken: token.token, refreshToken: token.refreshToken, expires: new Date(token.expires) };
};

// GET /coURL
const generateURL = async (req, res, next) => {
  const { type = '', redirect = '' } = req.query;
  const user = await getUserFromToken(getUserToken(req));

  let url = await axios.get(`${authServerIP}coURL`, {
    params: {
      type,
      redirect,
      userID: user._id,
      userType: user.type
    }
  });

  if (!url)
    throwError('APIGenerateCOURLError', 'Error during generation of google oauth url.')

  await res.send(url.data);
}

// GET /coInfo
const getContentOutletInfo = async (req, res, next) => {
  // call getOutletToken to get access token
  const { id } = req.query;
  const { accessToken, refreshToken, expires } = await getOutletToken(id);

  // call setCredentials on the OAuth2Client object with the token
  oauth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken, expiry_date: expires.valueOf() });
  const youtube = google.youtube({
    version: 'v3'
  });

  const callback = async (error, response) => {
    try {
      if (error)
        throw error;

      const channelID = response.data.items[0].id;
      const channelLink = `https://www.youtube.com/channel/${channelID}`;
      const profilePicture = response.data.items[0].snippet.thumbnails.default.url;
      const channelName = response.data.items[0].snippet.localized.title;
      const channelInfo = { channelID, channelLink, profilePicture, channelName };

      await res.send(channelInfo);
    } catch (error) {
      next(error);
    }
  };

  youtube.channels.list({
    "part": "snippet",
    "mine": "true"
  }, callback);
}

// GET /outlet
const getOutlet = async (req, res, next) => {
  const token = getUserToken(req);
  if (!token)
    throwError('APIAuthenticationError', 'Missing Authentication');

  const { id } = req.query;

  const { accessToken } = await getOutletToken(id);

  let outlet = await axios.get(`${dbServerIP}cotoken`, {
    params: {
      id
    }
  });

  if (typeof outlet !== 'object' || outlet === null || typeof outlet.data !== 'object' || outlet.data === null)
    throwError('APICOError', `Unable to find outlet '${id}'`);

  outlet = outlet.data;

  Object.assign(outlet, { accessToken });

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

// GET /outlets
const getOutlets = async (req, res, next) => {
  const token = getUserToken(req);

  let outlets = await axios.get(`${dbServerIP}outlets`);

  if (outlets)
    outlets = outlets.data;

	await res.send(outlets);
};

module.exports = {
  getOutlet,
  createOutlet,
  updateOutlet,
  getOutletToken,
  getContentOutletInfo,
  generateURL,
  getOutlets
};
