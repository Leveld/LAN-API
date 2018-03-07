const axios = require('axios');
const { throwError, dbServerIP } = require('capstone-utils');

const ERROR_NAME = 'APIConversationError';

// GET /conversation
const getConversation = async (req, res, next) => {
  const { id } = req.query;
  const { id : userID, type : userType } = req.authedUser;

  if (typeof id !== 'string')
    throwError(ERROR_NAME, 'Must provide an id' );

  let conversation = await axios.get(`${dbServerIP}conversation`, {
    params: {
      id
    }
  });

  let conversationVisible = true;

  if (!conversation || !conversation.data)
    conversationVisible = false;

  if (conversationVisible) {
    conversation = conversation.data;
    if (!(conversation.owner.ownerID === userID && conversation.owner.ownerType === userType)) {
      if (!conversation.participants.find(({participantID : pID, participantType : pType}) => pID === userID && pType === userType))
        conversationVisible = false;
    }
  }

  if (!conversationVisible)
    throwError(ERROR_NAME, `Could not find Conversation with id '${id}'` );

  if (res)
    await res.send(conversation);
  return conversation;
};

// POST /conversation
const createConversation = async (req, res, next) => {
  const { participants, name, description } = req.body;
  const { id : ownerID, type : ownerType } = req.authedUser;

  if (!Array.isArray(participants) || participants.length < 1)
    throwError(ERROR_NAME, `Expected participants to be an Array of at least one participant. Received: ${participants}`);

  const newConversation = await axios.post(`${dbServerIP}conversation`, { ownerID, ownerType, participants, name, description });

  if (!newConversation || !newConversation.data)
    throwError(ERROR_NAME, `Could not create conversation! Received '${JSON.stringify(req.body)}'`);

  await res.send(newConversation.data);

};

// PATCH /conversation
const updateConversation = async (req, res, next) => {
  const { id, fields } = req.body;

  if (typeof id !== 'string' || typeof fields !== 'object' || fields === null)
    throwError(ERROR_NAME, 'Must provide an id and fields' );

  req.query.id = id;

  let conversation

  try {
    conversation = await getConversation(req);
  } catch (error) {}

  if (!conversation)
    throwError(ERROR_NAME, `No Conversation found with id '${id}'`);

  conversation = await axios.patch(`${dbServerIP}conversation`, { id, fields });

  if (!conversation || !conversation.data)
    throwError(ERROR_NAME, `Could not update conversation! Received '${JSON.stringify(req.body)}'`);

  await res.send(conversation.data);
};

// GET /conversations
const getConversations = async (req, res, next) => {
  const { id : userID, type : userType } = req.authedUser;

  let conversations = await axios.get(`${dbServerIP}conversations`, {
    params: {
      userID, userType
    }
  });

  if (conversations)
    conversations = conversations.data;

  await res.send(conversations || []);
};

module.exports = {
  getConversation,
  createConversation,
  updateConversation,
  getConversations
};
