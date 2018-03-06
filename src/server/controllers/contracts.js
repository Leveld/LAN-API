const axios = require('axios');
const { throwError, dbServerIP } = require('capstone-utils');

const ERROR_NAME = 'APIContractError';

// GET /contract
const getContract = async (req, res, next) => {
  const { id } = req.query;
  if (typeof id !== 'string')
    throwError(ERROR_NAME, 'Must provide an id');

  let contract = await axios.get(`${dbServerIP}contract`, {
                               params: {
                                  id
                                }
                              });
  if(contract)
    contract = contract.data;
  else
    throwError(ERROR_NAME, `Could not find contract with id '${id}'`);

  await res.send(contract);
};

// POST /contract
const createContract = async (req, res, next) => {
  const { fields } = req.body;
  if (typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, `Missing parameter 'fields'`);

  let contract = await axios.post(`${dbServerIP}contract`, {
                            fields
                        });
  if(contract)
    contract = contract.data;
  else
    throwError(ERROR_NAME, `Unable to create contract`);

  await res.send(contract);
};

// PATCH /contract
const updateContract = async (req, res, next) => {
  const { id, fields } = req.body;

  if (typeof id !== 'string' || typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, 'Must provide an id and fields');

  let updatedContract = await axios.patch(`${dbServerIP}contract`, {
                            id,
                            fields
                        });

  if(updatedContract)
    updatedContract = updatedContract.data;
  else
    throwError(ERROR_NAME, `Unable to update contract with id '${id}'`);

  await res.send(updatedContract);
};

module.exports = {
  getContract,
  createContract,
  updateContract
};
