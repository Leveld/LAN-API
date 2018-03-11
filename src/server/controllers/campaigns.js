const axios = require('axios');
const { throwError, dbServerIP } = require('capstone-utils');

const ERROR_NAME = 'APICampaignError';

// GET /campaign
const getCampaign = async (req, res, next) => {
  const { id } = req.query;
  if (typeof id !== 'string')
    throwError(ERROR_NAME, 'Must provide an id' );

  let campaign = await axios.get(`${dbServerIP}campaign`, {
                               params: {
                                  id
                                }
                              });
  if(campaign)
    campaign = campaign.data;
  else
    throwError(ERROR_NAME, `Could not find campaign with id '${id}'`);

  await res.send(campaign);
};

// POST /campaign
const createCampaign = async (req, res, next) => {
  const { fields } = req.body;
  if (typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, `Missing parameter 'fields'`);

  let campaign = await axios.post(`${dbServerIP}campaign`, {
                            fields
                        });

  if(campaign)
    campaign = campaign.data;
  else
    throwError(ERROR_NAME, `Unable to create campaign`);

  await res.send(campaign);
};

// PATCH /campaign
const updateCampaign = async (req, res, next) => {
  const { id, fields } = req.body;

  if (typeof id !== 'string' || typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, 'Must provide an id and fields');

  let updatedCampaign = await axios.patch(`${dbServerIP}campaign`, {
                            id,
                            fields
                        });

  if(updatedCampaign)
    updatedCampaign = updatedCampaign.data;
  else
    throwError(ERROR_NAME, `Unable to update campaign with id '${id}'`);

  await res.send(updatedCampaign);
};

// PATCH /campaign/contract
const addContract = async (req, res, next) => {
  const { id, contractID } = req.body;

  if(typeof id !== 'string' || typeof contractID !== 'string')
    throwError(ERROR_NAME, 'Must provide a campaign ID and a contract ID');

  let updatedCampaign = await axios.patch(`${dbServerIP}campaign/contract`, {
                                            id,
                                            contractID
                                          });
  if(updatedCampaign)
    updatedCampaign = updatedCampaign.data;
  else
    throwError(ERROR_NAME, `Unable to add contract with id '${contractID}' to campaign with id '${id}'`);

  await res.send(updatedCampaign);
};

// GET /campaigns
const getCampaigns = async (req, res, next) => {
  let campaigns = await axios.get(`${dbServerIP}campaigns`, {
    params: req.query
  });

  if(campaigns)
    campaigns = campaigns.data;
  else
    throwError(ERROR_NAME, `Unable to find campaigns`);

  await res.send(campaigns);
};

module.exports = {
  getCampaign,
  createCampaign,
  updateCampaign,
  addContract,
  getCampaigns
};
