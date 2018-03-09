const axios = require('axios');
const { throwError, authServerIP, dbServerIP } = require('capstone-utils');
const cachios = require('cachios');

// GET /coURL
const generateURL = async (req, res, next) => {
  const { type = '', redirect = '' } = req.query;
  const user = req.authedUser;

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
  const { id, startDate, endDate } = req.query;

  let outletInfo = await cachios.get(`${dbServerIP}coInfo`, {
    ttl: 60 * 30,
    params: {
      id,
      startDate,
      endDate
    },
  });

  if (!outletInfo)
    outletInfo = null;
  else
    outletInfo = outletInfo.data;

  await res.send(outletInfo);
};

// GET /outlet
const getOutlet = async (req, res, next) => {
  const token = req.authToken;
  const { id } = req.query;

  let outlet = await axios.get(`${dbServerIP}cotoken`, {
    params: {
      id
    }
  });

  if (typeof outlet !== 'object' || outlet === null || typeof outlet.data !== 'object' || outlet.data === null)
    throwError('APICOError', `Unable to find outlet '${id}'`);

  outlet = outlet.data;

  await res.send(outlet);
};

// POST /outlet
const createOutlet = async (req, res, next) => {
  const { fields } = req.body;

  if (typeof fields !== 'object')
    throwError('APIContentOutletError', `Missing parameter 'fields'`);

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
    throwError('APIContentOutletError', `Missing parameter 'id'`);
  if (typeof fields !== 'object')
    throwError('APIContentOutletError', `Missing parameter 'fields'`);

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
  let outlets = await axios.get(`${dbServerIP}outlets`);

  if (outlets)
    outlets = outlets.data;

  await res.send(outlets);
};

module.exports = {
  getOutlet,
  createOutlet,
  updateOutlet,
  getContentOutletInfo,
  generateURL,
  getOutlets
};
