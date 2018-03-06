### Get All

Get all Users

```endpoint
GET /users
```

#### Example Request

```curl
$ curl $url$users \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$users', {
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example Response

```json
[
  {
    "_id": "laksdjflk3j45629384j2lk34j",
    "type": "User",
    "email": "joe@hotmail.com",
    "emailVerified": true,
    "name": "Joe Smith",
    "auth0ID": "auth0|lkajdflkj2l3ij498hsdfnslkdf",
    "lastIP": "135.242.49.191",
    "lastLoginAt": "2018-02-20T01:40:05.110Z",
    "createdAt": "2018-01-20T01:40:05.110Z",
    "age": 43,
    "gender": "Male",
    "contact": {
      "email": "bobby@example.com",
      "phoneNumber": "(555) 555-5555",
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
    }
  },
  {
    "_id": "387s8dfgsldkajslkeu",
    "type": "Business",
    "email": "jack@gmail.com",
    "emailVerified": true,
    "name": "Jack Jackson",
    "auth0ID": "auth0|jsdfli894l2lidfuslkd",
    "lastIP": "20.174.121.254",
    "lastLoginAt": "2018-02-20T01:40:05.110Z",
    "createdAt": "2018-01-20T01:40:05.110Z",
    "age": 37,
    "gender": "Male",
    "contact": {
      "email": "jacky@example.com",
      "phoneNumber": "(555) 555-5555",
      "facebook": "https://facebook.com/Jacky",
      "twitter": "https://twitter.com/Jacky",
      "linkedIn": "https://linkedin.com/Jacky",
      "googlePlus": "https://plus.google.com/Jacky",
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
    "managers": []
  }
]
```
