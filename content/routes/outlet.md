## ContentOutlets

Use these routes to get information on a ContentOutlet or to retrieve a url used to authenticate a new ContentOutlet.

### Get

Get a ContentOutlet.

```endpoint
GET /outlet?id={CONTENT_OUTLET_ID}
```

#### Example request

```curl
$ curl $url$outlet?id=ji83ik2l99s9sl2klk1fj \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$outlet', {
  params: {
    id: 'ji83ik2l99s9sl2klk1fj'
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
  "_id": "ji83ik2l99s9sl2klk1fj",
  "channelName": "The Cool Channel",
  "channelID": "lijfoa98sujf2k3j1lk2j",
  "profilePicture": "https://example.com/image/lakjsdlfkj.jpg",
  "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
  "owner": {
    "ownerType": "ContentProducer",
    "ownerID": "lakjdsflkj12lkj309"
  },
  "lastUpdated": "2018-02-20T00:32:16.220Z"

}
```

**Parameters**

Property | Description
---------|---------
`id`     | The `id` of the ContentOutlet.






### Create

Create a ContentOutlet.

```endpoint
POST /outlet
```

#### Example request

```curl
$ curl -v -XPOST $url$outlet \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "fields": {
    "channelName": "The Cool Channel",
    "channelID": "lijfoa98sujf2k3j1lk2j",
    "profilePicture": "https://example.com/image/lakjsdlfkj.jpg",
    "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
    "owner": {
      "ownerType": "ContentProducer",
      "ownerID": "lakjdsflkj12lkj309"
    }
  }
}'
```

```javascript
axios.post('$url$outlet', {
    fields: {
    channelName: 'The Channel',
    channelID: 'lijfoa98sujf2k3j1lk2j',
    profilePicture: 'https://example.com/image/lakjsdlfkj.jpg',
    channelLink: 'https://example.com/lijfoa98sujf2k3j1lk2j',
    owner: {
      ownerType: 'ContentProducer',
      ownerID: 'lakjdsflkj12lkj309'
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
  "_id": "ji83ik2l99s9sl2klk1fj",
  "channelName": "The Cool Channel",
  "channelID" : "lijfoa98sujf2k3j1lk2j",
  "profilePicture": "https://example.com/image/lakjsdlfkj.jpg",
  "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
  "owner": {
    "ownerType": "ContentProducer",
    "ownerID": "lakjdsflkj12lkj309"
  }
}
```

**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the ContentOutlet schema.


 - **fields**

Property         | Description
-----------------|-----------------
`channelName`    | The name of the channel, pulled from the Youtube API.
`channelID`      | The ID of the ContentOutlet, pulled from the Youtube API.
`profilePicture` | The profile picture of the ContentOutlet, pulled from the Youtube API.
`channelLink`    | A URL pointing to the ContentOutlet, pulled from the Youtube API.
`owner`          | The account which owns this ContentOutlet.

 - **fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of account this ContentOutlet belongs to.
`ownerID`   | The ID of the account this ContentOutlet belongs to.







### Update

Update a ContentOutlet.

```endpoint
PATCH /outlet
```

#### Example request

```curl
$ curl -v -XPATCH $url$outlet \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "id": "ji83ik2l99s9sl2klk1fj",
  "fields": {
    "channelName": "The Cool Channel",
    "profilePicture": "https://example.com/image/lakjsdlfkj.jpg"
  }
}'
```

```javascript

axios.patch('$url$outlet', {
    id: 'ji83ik2l99s9sl2klk1fj',
    fields: {
      channelName: 'The Lame Channel',
      profilePicture: 'https://example.com/image/lamePic.jpg'
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
  "_id": "ji83ik2l99s9sl2klk1fj",
  "channelName": "The Lame Channel",
  "channelID" : "lijfoa98sujf2k3j1lk2j",
  "profilePicture": "https://example.com/image/lamePic.jpg",
  "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
  "owner": {
    "ownerType": "ContentProducer",
    "ownerID": "lakjdsflkj12lkj309"
  }
}
```

**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the ContentOutlet schema.


  - **fields**

Property         | Description
-----------------|-----------------
`channelName`    | The name of the channel, pulled from the Youtube API.
`channelID`      | The ID of the ContentOutlet, pulled from the Youtube API.
`profilePicture` | The profile picture of the ContentOutlet, pulled from the Youtube API.
`channelLink`    | A URL pointing to the ContentOutlet, pulled from the Youtube API.
`owner`          | The account which owns this ContentOutlet.

  - **fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of account this ContentOutlet belongs to.
`ownerID`   | The ID of the account this ContentOutlet belongs to.
