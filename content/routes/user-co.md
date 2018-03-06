### Add ContentOutlet

Add a ContentOutlet to a User

```endpoint
PATCH /user/co
```

#### Example request


```curl
$ curl -v -XPATCH $url$user/co \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "contentOutlet": "ji83ik2l99s9sl2klk1fj"
}'
```

```javascript

axios.patch('$url$user/co', {
  contentOutlet: "ji83ik2l99s9sl2klk1fj"
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
  "_id": "laksdjflk3j45629384j2lk34j",
  "type": "ContentProducer",
  "email": "greg@example.com",
  "emailVerified": true,
  "name": "Bobby",
  "auth0ID": "auth0|lkajdflkj2l3ij498hsdfnslkdf",
  "lastIP": "135.242.49.191",
  "lastLoginAt": "2018-02-20T01:40:05.110Z",
  "createdAt": "2018-01-20T01:40:05.110Z",
  "age": 49,
  "gender": "Male",
  "contact": {
    "email": "bobby@example.com",
    "phoneNumber": "(555) 555-5554",
    "facebook": "https://facebook.com/Bobby",
    "twitter": "https://twitter.com/Bobby",
    "linkedIn": "https://linkedin.com/Bobby",
    "googlePlus": "https://plus.google.com/Bobby",
  },
  "settings": {
    "showEmail": false,
    "showContactEmail": true,
    "showAge": true,
    "showGender": true,
    "showPhoneNumber": false,
    "showFacebook": false,
    "showTwitter": false,
    "showLinkedIn": false,
    "showGooglePlus": true
  },
  "contentOutlets" : [{
    "_id": "ji83ik2l99s9sl2klk1fj",
    "channelName": "The Lame Channel",
    "channelID" : "lijfoa98sujf2k3j1lk2j",
    "profilePicture": "https://example.com/image/lamePic.jpg",
    "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
    "owner": {
      "ownerType": "ContentProducer",
      "ownerID": "lakjdsflkj12lkj309"
    }
  }]
}
```

**Parameters**

Property        | Description
----------------|----------------
`contentOutlet` | The ContentOutlet ID to add to this User.
