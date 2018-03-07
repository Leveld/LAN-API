## Conversation

### Schema


```javascript-left
{
  isGroup: {
    type: Boolean,
    default: false
  },
  owner: {
    ownerType: {
      type: String,
      enum: userTypes,
      required: true
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'owner.ownerType',
      required: true
    }
  },
  name: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  participants: [{
    participantType: {
      type: String,
      enum: userTypes,
      required: true
    },
    participantID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participants.participantType',
      required: true
    }
  }]
}
```

#### Example Conversation

```json
{
  "id": "5a9f1f08f17db837807a5de5",
  "isGroup": false,
  "owner": {
    "ownerID": "5a9f1bbca71f0218b8a0c4dd",
    "ownerType": "ContentProducer"
  },
  "name": null,
  "description": null,
  "participants": [
    {
      "participantID": "5a9f1bdca71f0218b8a0c4df",
      "participantType": "ContentProducer"
    }
  ],
  "createdAt": "2018-03-06T23:06:49.004Z",
  "updatedAt": "2018-03-07T05:01:09.726Z",
  "messages": [
    {
      "id": "5a9f739c7831b9105c2bd90b",
      "author": {
        "authorID": "5a9f1bbca71f0218b8a0c4dd",
        "authorType": "ContentProducer"
      },
      "conversation": "5a9f1f08f17db837807a5de5",
      "messageType": "Chat",
      "value": "Hey there dood",
      "createdAt": "2018-03-07T05:07:40.473Z",
      "updatedAt": "2018-03-07T05:07:40.473Z",
      "readers": [
        {
          "readerID": "5a9f1bdca71f0218b8a0c4df",
          "readerType": "ContentProducer"
        }
      ]
    }
  ]
}
```



**Fields**

Property       | Description
---------------|---------------
`name`         | The name of the conversation.
`description`  | The description of the conversation.
`isGroup`      | Whether or not the conversation is a group chat (more than 2 people).
`owner`        | The account which created the conversation.
`participants` | An array of users who are a part of the conversation (excludes owner).
`messages`     | An array of messages in the conversation. See the [User](#models-message-schema) for more info.

  - **Fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of the owner (user who created the conversation).
`ownerID`   | The id of the owner (user who created the conversation).

  - **Fields.participants**

Property          | Description
------------------|------------------
`participantType` | The type of the participant.
`participantID`   | The id of the participant.
