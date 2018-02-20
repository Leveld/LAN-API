### Get Info

Pull ContentOutlet information directly from the YouTube API.

```endpoint
GET /coInfo?id={CONTENT_OUTLET_ID}
```

#### Example request

```curl
$ curl http://localhost:3000/coInfo?id=ji83ik2l99s9sl2klk1fj \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('http://localhost:3000/coInfo', {
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
  "channelName": "The Cool Channel",
  "profilePicture": "https://example.com/image/lakjsdlfkj.jpg",
  "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
}
```

Property | Description
---------|---------
`id`     | The `id` of the ContentOutlet.
