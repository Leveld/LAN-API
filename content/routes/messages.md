## Messages

### Get

Get a Message.

```endpoint
GET /message?id={MESSAGE_ID}
```

#### Example request

```curl
$ curl $url$message?id=5a9f739c7831b9105c2bd90b \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$message', {
  params: {
    id: '5a9f739c7831b9105c2bd90b'
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
```

**Parameters**

Property | Description
---------|---------
`id`     | The `id` of the Message.


### Create

Create a Message.

```endpoint
POST /message
```

#### Example request

```curl
$ curl -v -XPOST $url$message \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "fields": {
    "conversation": "5a9f1f08f17db837807a5de5",
    "messageType": "Chat",
    "value": "Hey there dood"
  }
}'
```

```javascript
axios.post('$url$message', {
    fields: {
      conversation: '5a9f1f08f17db837807a5de5',
      messageType: 'Chat',
      value: 'Hey there dood'
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
  "id": "5a9fa712d361f50ee084af4e",
  "author": {
    "authorID": USER_ID,
    "authorType": USER_TYPE
  },
  "conversation": "5a9f1f08f17db837807a5de5",
  "messageType": "Chat",
  "value": "Hey there dood",
  "createdAt": "2018-03-07T08:47:14.854Z",
  "updatedAt": "2018-03-07T08:47:14.854Z",
  "readers": [
    {
      "readerID": "5a9f1bdca71f0218b8a0c4df",
      "readerType": "ContentProducer"
    }
  ]
}
```

**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Message schema.


 - **fields**

Property             | Description
---------------------|-----------------
`conversation`       | The ID of the conversation this message belongs to.
`messageType`        | The type of message (ie, `'Chat'`/`'Payment'`/`'Contract'`/`'File'`/.
`value`              | The message content.


### Update

Update a Message.

```endpoint
PATCH /message
```

#### Example request

```curl
$ curl -v -XPATCH $url$message \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "id": "5a9fa712d361f50ee084af4e",
  "fields": {
    "conversation": "5a9f1f08f17db837807a5de5",
    "value": "Wazzupp"
  }
}'
```

```javascript

axios.patch('$url$message', {
   "id: '5a9fa712d361f50ee084af4e',
    fields: {
      conversation: '5a9f1f08f17db837807a5de5',
      value: 'Wazzupp'
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
  "id": "5a9fa712d361f50ee084af4e",
  "author": {
    "authorID": USER_ID,
    "authorType": USER_TYPE
  },
  "conversation": "5a9f1f08f17db837807a5de5",
  "messageType": "Chat",
  "value": "Wazzup",
  "createdAt": "2018-03-07T08:47:14.854Z",
  "updatedAt": "2018-03-07T08:47:14.854Z",
  "readers": [
    {
      "readerID": "5a9f1bdca71f0218b8a0c4df",
      "readerType": "ContentProducer"
    }
  ]
}
```
**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Message schema.


 - **fields**

Property             | Description
---------------------|-----------------
`conversation`       | (optional) The ID of the conversation this message belongs to.
`messageType`        | (optional) The type of message (ie, `'Chat'`/`'Payment'`/`'Contract'`/`'File'`/.
`value`              | (optional) The message content.


### Get All

Get all Messages the user referenced by their Authorization token has written.

```endpoint
GET /messages
```

#### Example request

```curl
$ curl $url$messages \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$messages', {
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
    "id": "5a9fa712d361f50ee084af4e",
    "author": {
      "authorID": USER_ID,
      "authorType": USER_TYPE
    },
    "conversation": "5a9f1f08f17db837807a5de5",
    "messageType": "Chat",
    "value": "Wazzup",
    "createdAt": "2018-03-07T08:47:14.854Z",
    "updatedAt": "2018-03-07T08:47:14.854Z",
    "readers": [
      {
        "readerID": "5a9f1bdca71f0218b8a0c4df",
        "readerType": "ContentProducer"
      }
    ]
  },
  {
    "id": "5a9fa712d361f50ee084af4e",
    "author": {
      "authorID": USER_ID,
      "authorType": USER_TYPE
    },
    "conversation": "5a9f1f08f17db837807a5de5",
    "messageType": "Chat",
    "value": "Hey man",
    "createdAt": "2018-04-07T08:47:14.854Z",
    "updatedAt": "2018-04-07T08:47:14.854Z",
    "readers": [
      {
        "readerID": "5a9f1bdca71f0218b8a0c4df",
        "readerType": "ContentProducer"
      }
    ]
  }
]
```
