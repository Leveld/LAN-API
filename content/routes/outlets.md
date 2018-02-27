### Get All

Get all ContentOutlets.

Always returns an array. If there are no ContentOutlets, it will return an empty array.

```endpoint
GET /outlets
```

#### Example request

```curl
$ curl $url$outlets \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$outlets', {
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
  },
  {
    "_id": "jhs03ikuhy9s9sl2v4rjmfj",
    "channelName": "The Best Channel",
    "channelID": "lu7rfoa9c4rgjfma8vlzzy",
    "profilePicture": "https://example.com/image/4aj66flfkj.jpg",
    "channelLink": "https://example.com/lu7rfoa9c4rgjfma8vlzzy",
    "owner": {
      "ownerType": "ContentProducer",
      "ownerID": "ehh7kj12lg3w9x309"
    },
    "lastUpdated": "2018-02-25T00:32:35.220Z"
  }
]
```
