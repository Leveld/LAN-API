## Users

### Get User

Get a User.

```endpoint
GET /user
```

#### Example request

```curl
$ curl http://localhost:3000/user \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('http://localhost:3000/user', {
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
  "type": "User",
  "email": "joe@hotmail.com",
  "emailVerified": true,
  "name": "Joe Smith",
  "auth0ID": "auth0|lkajdflkj2l3ij498hsdfnslkdf",
  "lastIP": "135.292.49.191",
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
}
```











### Convert User

Convert a User to another type.

```endpoint
PUT /user
```

#### Example request

```curl
$ curl -v -XPUT http://localhost:3000/user \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "type": "ContentProducer"
  "fields": {
    "email": "bob@example.com",
    "emailVerified": true,
    "name": "Bobby",
  }
}'
```

```javascript
axios.put('http://localhost:3000/user', {
    type: "ContentProducer",
    "fields": {
      email: 'bob@example.com',
      emailVerified: true,
      name: 'Bobby'
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
  "_id": "laksdjflk3j45629384j2lk34j",
  "type": "ContentProducer",
  "email": "bob@example.com",
  "emailVerified": true,
  "name": "Bobby",
  "auth0ID": "auth0|lkajdflkj2l3ij498hsdfnslkdf",
  "lastIP": "135.292.49.191",
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
}
```

**Parameters**

Property | Description
---------|---------
`type`   | The type to convert the user to.
`fields` | A key-value Object of properties matching the User schema.


 - **fields**

Property        | Description
----------------|----------------
`type`          | The type of the user.
`email`         | The user's email address.
`emailVerified` | Whether or not the user has verified their email address.
`name`          | The user's name.
`auth0ID`       | The user's ID with auth0.
`lastIP`        | The last IP address the user logged in with.
`lastLoginAt`   | The last time the user logged in.
`createdAt`     | The time the User's account was created.
`age`           | The user's age.
`gender`        | The user's gender.
`contact`       | The account which owns this ContentOutlet.
`settings`      | The contact information of the user

 - **fields.contact**

Property      | Description
--------------|--------------
`email`       | The email address to contact the user with.
`phoneNumber` | The user's phone number.
`facebook`    | The URL of the user's facebook profile.
`twitter`     | The URL of the user's twitter profile.
`linkedIn`    | The URL of the user's linkedIn profile.
`googlePlus`  | The URL of the user's googlePlus profile.


 - **fields.settings**

Property           | Description
-------------------|-------------------
`showEmail`        | Whether or not to show their email on their profile.
`showContactEmail` | Whether or not to show their contact email their profile.
`showAge`          | Whether or not to show their age on their profile.
`showGender`       | Whether or not to show their gender on their profile.
`showPhoneNumber`  | Whether or not to show their phone number on their profile.
`showFacebook`     | Whether or not to show an anchor to their Facebook account on their profile.
`showTwitter`      | Whether or not to show an anchor to their Twitter account on their profile.
`showLinkedIn`     | Whether or not to show an anchor to their LinkedIn account on their profile.
`showGooglePlus`   | Whether or not to show an anchor to their Google Plus account on their profile.











### Update User

Update a User.

```endpoint
PATCH /user
```

#### Example request

```curl
$ curl -v -XPATCH http://localhost:3000/user \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "fields": {
    "email": "greg@example.com",
    "age": "49",
    "contact": {
      "phoneNumber": "(555) 555-5554"
    }
  }
}'
```

```javascript

axios.patch('http://localhost:3000/outlet', {
    fields: {
      email: 'greg@example.com',
      age: '49',
      contact: {
        phoneNumber: '(555) 555-5554'
      }
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
  "_id": "laksdjflk3j45629384j2lk34j",
  "type": "ContentProducer",
  "email": "greg@example.com",
  "emailVerified": true,
  "name": "Bobby",
  "auth0ID": "auth0|lkajdflkj2l3ij498hsdfnslkdf",
  "lastIP": "135.292.49.191",
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
  }
}
```

**Parameters**

Property | Description
---------|---------
`type`   | The type to convert the user to.
`fields` | A key-value Object of properties matching the User schema.


 - **fields**

Property        | Description
----------------|----------------
`type`          | The type of the user.
`email`         | The user's email address.
`emailVerified` | Whether or not the user has verified their email address.
`name`          | The user's name.
`auth0ID`       | The user's ID with auth0.
`lastIP`        | The last IP address the user logged in with.
`lastLoginAt`   | The last time the user logged in.
`createdAt`     | The time the User's account was created.
`age`           | The user's age.
`gender`        | The user's gender.
`contact`       | The account which owns this ContentOutlet.
`settings`      | The contact information of the user

 - **fields.contact**

Property      | Description
--------------|--------------
`email`       | The email address to contact the user with.
`phoneNumber` | The user's phone number.
`facebook`    | The URL of the user's facebook profile.
`twitter`     | The URL of the user's twitter profile.
`linkedIn`    | The URL of the user's linkedIn profile.
`googlePlus`  | The URL of the user's googlePlus profile.


 - **fields.settings**

Property           | Description
-------------------|-------------------
`showEmail`        | Whether or not to show their email on their profile.
`showContactEmail` | Whether or not to show their contact email their profile.
`showAge`          | Whether or not to show their age on their profile.
`showGender`       | Whether or not to show their gender on their profile.
`showPhoneNumber`  | Whether or not to show their phone number on their profile.
`showFacebook`     | Whether or not to show an anchor to their Facebook account on their profile.
`showTwitter`      | Whether or not to show an anchor to their Twitter account on their profile.
`showLinkedIn`     | Whether or not to show an anchor to their Google Plus account on their profile.
`showGooglePlus`   | Whether or not to show an anchor to their Google Plus account on their profile.











### Add ContentOutlet

Add a ContentOutlet to a User

```endpoint
PATCH /user/co
```

#### Example request


```curl
$ curl -v -XPATCH http://localhost:3000/user/co \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "contentOutlet": "la4rdjflk3gh293866tk34j"
}'
```

```javascript

axios.patch('http://localhost:3000/outlet', {
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
  "lastIP": "135.292.49.191",
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
