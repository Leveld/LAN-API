const axios = require('axios');
const { throwError, dbServerIP } = require('capstone-utils');

const ERROR_NAME = 'APIMessageError';

// GET /message
const getMessage = async (req, res, next) => {
  const { id } = req.query;

  if (typeof id !== 'string')
    throwError(ERROR_NAME, `Expected 'id' to be a String. Received: ${id}`);

  const message = await axios.get(`${dbServerIP}message`, {
    params: {
      id
    }
  });

  if (!message || !message.data)
    throwError(ERROR_NAME, `Could not find Message by id '${id}'`);

  await res.send(message.data);
};

// POST /message
const createMessage = async (req, res, next) => {
  const { fields } = req.body;
  fields.author = {
    authorID: req.authedUser.id,
    authorType: req.authedUser.type
  };

  if (typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, 'Must provide fields' );

  const newMessage = await axios.post(`${dbServerIP}message`, { fields });

  if (!newMessage || !newMessage.data)
    throwError(ERROR_NAME, `Could not create message! Received '${JSON.stringify(req.body)}'`);

  await res.send(newMessage.data);
};

// PATCH /message
const updateMessage = async (req, res, next) => {
  const { id, fields } = req.body;
  fields.author = {
    authorID: req.authedUser.id,
    authorType: req.authedUser.type
  };

  if (typeof id !== 'string' || typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, 'Must provide an id and fields' );

  const existingMessage = await axios.get(`${dbServerIP}message`, {
    params: {
      id
    }
  });

  if (!existingMessage || !existingMessage.data)
    throwError(ERROR_NAME, `No Message found with id '${id}'`);

  const message = await axios.patch(`${dbServerIP}message`, { id, fields });

  if (!message || !message.data)
    throwError(ERROR_NAME, `Could not update message! Received '${JSON.stringify(req.body)}'`);

  await res.send(message.data);
};

// GET /messages
const getMessages = async (req, res, next) => {
  const { id : authorID, type : authorType } = req.authedUser;

  if (typeof authorID !== 'string')
    throwError(ERROR_NAME, `Expected authorID to be a String. Received: ${authorID}`);
  if (typeof authorType !== 'string')
    throwError(ERROR_NAME, `Expected authorType to be a String. Received: ${authorType}`);

  let messages = await axios.get(`${dbServerIP}messages`, {
    params: {
      authorID, authorType
    }
  });

  if (messages)
    messages = messages.data;

  await res.send(messages || []);
};

module.exports = {
  getMessage,
  createMessage,
  updateMessage,
  getMessages
};
