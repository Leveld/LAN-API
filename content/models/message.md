## Message

### Schema


```javascript-left
{
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  messageType: {
    type: String,
    enum: ['Chat', 'Payment', 'Contract', 'File'],
    required: true
  },
  author: {
    authorType: {
      type: String,
      enum: userTypes,
      required: true
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'author.authorType',
      required: true
    }
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}
```

#### Example Conversation

```json
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
      "readers": "5a9f1bdca71f0218b8a0c4df",
      "readers": "ContentProducer"
    }
  ]
}
```



**Fields**

Property       | Description
---------------|---------------
`conversation` | The name of the message.
`messageType`  | The type of message (ie, `'Chat'`/`'Payment'`/`'Contract'`/`'File'`).
`value`        | The content of the message.
`author`       | The account which created the message.
`readers`      | An array of users who are able to view the message (excludes owner).

  - **Fields.author**

Property     | Description
-------------|-------------
`authorID`   | The type of the author (user who created the message).
`authorType` | The id of the author (user who created the message).

  - **Fields.readers**

Property  | Description
----------|----------
`readers` | The type of the reader (user who is able to view the message).
`readers` | The id of the reader (user who is able to view the message).
