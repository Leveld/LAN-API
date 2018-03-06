## Users

### Get

Get a User.

```endpoint
GET /user
```

#### Example request (the user that USER_TOKEN belongs to)

```curl
$ curl $url$user \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$user', {
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example response (the user that USER_TOKEN belongs to)


```json
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
}
```

#### Example request (a specific user)

```curl
$ curl $url$user?id=387s8dfgsldkajslkeu&type=Business \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$user', {
  params: {
    id: 387s8dfgsldkajslkeu,
    type: 'Business'
  },
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example response (a specific user)

```json
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
```

**Parameters**

Property | Description
---------|---------
`id`     | (optional) The id of the user you wish to lookup.
`type`   | (optional) The account type of the user you wish to lookup.<br>Valid `type`s (not case-sensitive): `'User'`/`'ContentProducer'`/`'Business'`/`'Manager'`

If you call `GET` `/user` without an `id`, you will get the user that the `USER_TOKEN` belongs to.
If you call `GET` `/user` with an `id`, you must provide a `type`.










### Convert

Convert a User to another type.

```endpoint
PUT /user
```

#### Example request

```curl
$ curl -v -XPUT $url$user \
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
axios.put('$url$user', {
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











### Update

Update a User.

```endpoint
PATCH /user
```

#### Example request

```curl
$ curl -v -XPATCH $url$user \
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

axios.patch('$url$outlet', {
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
