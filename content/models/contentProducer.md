## Content Producers

A Content Producer is a user that creates content on Content Outlets, such as Youtube.

### Schema

```
{
  type: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  },
  auth0ID: {
    type: String,
    required: true
  },
  lastIP: String,
  lastLoginAt: Date,
  createdAt: {
    type: Date,
    required: true
  },
  age: Number,
  gender: String,
  contact: {
    email: String,
    phoneNumber: String,
    facebook: String,
    twitter: String,
    linkedIn: String,
    googlePlus: String
  },
  settings: {
    showEmail: {
      type: Boolean,
      default: false
    },
    showContactEmail: {
      type: Boolean,
      default: false
    },
    showAge: {
      type: Boolean,
      default: false
    },
    showGender: {
      type: Boolean,
      default: false
    },
    showPhoneNumber: {
      type: Boolean,
      default: false
    },
    showFacebook: {
      type: Boolean,
      default: false
    },
    showTwitter: {
      type: Boolean,
      default: false
    },
    showLinkedIn: {
      type: Boolean,
      default: false
    },
    showGooglePlus: {
      type: Boolean,
      default: false
    }
  },
  contentOutlets: [ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContentOutlet'
  }]
}
```

#### Example Content Producer
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
  "contentOutlets": [
    "54759eb3c090d83494e2d804"
  ]
}
```



 **Fields**

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
`contentOutlets` | The MongoDB IDs of this Content Proucer's Content Outlets

 - **Fields.contact**

Property      | Description
--------------|--------------
`email`       | The email address to contact the user with.
`phoneNumber` | The user's phone number.
`facebook`    | The URL of the user's facebook profile.
`twitter`     | The URL of the user's twitter profile.
`linkedIn`    | The URL of the user's linkedIn profile.
`googlePlus`  | The URL of the user's googlePlus profile.


 - **Fields.settings**

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




