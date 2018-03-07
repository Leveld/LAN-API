## Conversations

### Get

Get a Conversation.

```endpoint
GET /conversation?id={CONVERSATION_ID}
```

#### Example request

```curl
$ curl $url$conversation?id=5a9f1f08f17db837807a5de5 \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$conversation', {
  params: {
    id: '5a9f1f08f17db837807a5de5'
  },
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example response

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

**Parameters**

Property | Description
---------|---------
`id`     | The `id` of the Campaign.


### Create

Create a Conversation.

```endpoint
POST /conversation
```

#### Example request

```curl
$ curl -v -XPOST $url$conversation \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "participants": [
    {
      "participantID": "5a9f6411b6a5b620ccf1dbf8",
      "participantType": "ContentProducer"
    }
  ]
}'
```

```javascript
axios.post('$url$conversation', {
    participants: [
      {
        participantID: '5a9f6411b6a5b620ccf1dbf8',
        participantType: 'ContentProducer'
      }
    ]
  }, {
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example response

```json
{
  "id": "5a9f1f08f17db837807a5de5",
  "isGroup": false,
  "owner": {
    "ownerID": USER_ID,
    "ownerType": USER_TYPE
  },
  "name": null,
  "description": null,
  "participants": [
    {
      "participantID": "5a9f6411b6a5b620ccf1dbf8",
      "participantType": "ContentProducer"
    }
  ],
  "createdAt": "2018-03-06T23:06:49.004Z",
  "updatedAt": "2018-03-07T05:01:09.726Z",
  "messages": []
}
```

**Parameters**

Property             | Description
---------------------|-----------------
`participants`       | An array of participants containing a `userID` and `userType`.
`name`               | (optional) A name for the conversation.
`description`        | (optional) A description for the conversation.

### Update

Update a Conversation.

```endpoint
PATCH /conversation
```

#### Example request

```curl
$ curl -v -XPATCH $url$conversation \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "id": "5a9f1f08f17db837807a5de5",
  "fields": {
    "name": "Cool kids convo"
  }
}'
```

```javascript

axios.patch('$url$conversation', {
    id: '5a9f1f08f17db837807a5de5',
    fields: {
      name: 'Cool kids convo'
    }
  }, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      withCredentials: true
    }
});

```

#### Example response

```json
{
  "id": "5a9f1f08f17db837807a5de5",
  "isGroup": false,
  "owner": {
    "ownerID": "5a9f1bbca71f0218b8a0c4dd",
    "ownerType": "ContentProducer"
  },
  "name": "Cool kids convo",
  "description": null,
  "participants": [
    {
      "participantID": "5a9f6411b6a5b620ccf1dbf8",
      "participantType": "ContentProducer"
    }
  ],
  "createdAt": "2018-03-06T23:06:49.004Z",
  "updatedAt": "2018-03-07T05:01:09.726Z",
  "messages": []
}
```
**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Conversation schema.


 - **fields**

Property             | Description
---------------------|-----------------
`participants`       | (optional) An array of participants containing a `userID` and `userType`.
`name`               | (optional) A name for the conversation.
`description`        | (optional) A description for the conversation.



### Get All

Get all Conversations the user referenced by their Authorization token is a part of. Includes Conversations that they are the owner of and Conversations where they are a participant.

```endpoint
GET /conversations
```

#### Example request

```curl
$ curl $url$conversations \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$conversations', {
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example response

```json
[
  {
    "id": "5a9f1f08f17db837807a5de5"
    "isGroup": false,
    "owner": {
      "ownerID": "5a9f1bbca71f0218b8a0c4dd",
      "ownerType": "ContentProducer"
    },
    "name": "Cool kids convo",
    "description": null,
    "participants": [
      {
        "participantID": "5a9f1bdca71f0218b8a0c4df",
        "participantType": "ContentProducer"
      }
    ],
    "createdAt": "2018-03-06T23:06:49.004Z",
    "updatedAt": "2018-03-07T09:52:18.499Z",
    "messages": [
      {
        "author": {
          "authorID": "5a9f1bbca71f0218b8a0c4dd",
          "authorType": "ContentProducer"
        },
        "id": "5a9f739c7831b9105c2bd90b"
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
      },
      {
        "author": {
          "authorID": "5a9f1bbca71f0218b8a0c4dd",
          "authorType": "ContentProducer"
        },
        "id": "5a9fa712d361f50ee084af4e",
        "conversation": "5a9f1f08f17db837807a5de5",
        "messageType": "Chat",
        "value": "Hey man",
        "createdAt": "2018-03-07T08:47:14.854Z",
        "updatedAt": "2018-03-07T08:54:21.460Z",
        "readers": [
          {
            "readerID": "5a9f1bdca71f0218b8a0c4df",
            "readerType": "ContentProducer"
          }
        ]
      }
    ]
  },
  {
    "id": "5a9f6dd64a6c081d803f5cbb",
    "isGroup": false,
    "owner": {
      "ownerID": "5a9f1bbca71f0218b8a0c4dd",
      "ownerType": "ContentProducer"
    },
    "name": null,
    "description": null,
    "participants": [
      {
        "participantID": USER_ID,
        "participantType": USER_TYPE
      }
    ],
    "createdAt": "2018-03-07T04:43:02.062Z",
    "updatedAt": "2018-03-07T04:43:02.062Z",
    "messages": []
  },
  {
    "id": "5a9fba44ed4f902b7035a001",
    "isGroup": false,
    "owner": {
      "ownerID": USER_ID,
      "ownerType": USER_TYPE
    },
    "name": null,
    "description": null,
    "participants": [
      {
        "participantID": "5a9f1bdca71f0218b8a0c4df",
        "participantType": "ContentProducer"
      }
    ],
    "createdAt": "2018-03-07T10:09:08.964Z",
    "updatedAt": "2018-03-07T10:09:08.964Z",
    "messages": []
  }
]
```
