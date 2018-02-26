## Auth0 Token

This is the token required to authenticate with Auth0.

### Schema

```
{
  user: {
    userID: {
      type: String,
      required: true
    },
    accountType: {
      type: String,
      require: true
    },
    emailVerified: {
      type: Boolean,
      default: false
    }
  },
  token: {
    token: {
      type: String,
      required: true
    },
    expires: {
      type: Date,
      required: true
    }
  }
}
```

#### Example 

```json
  "user": {
    "userID": "laksdjflk3j45629384j2lk34j",
    "accountType": "ContentProducer",
    "emailVerified": true
  },
  "token": {
    "token": "m98dsldj19jakjc90ajlyrree",
    "expires": "2018-02-20T00:32:16.220Z"
  }
}
```

  **Fields**

Property         | Description
-----------------|-----------------
`user`           | The user associated with the token.
`token`          | The Auth0 token.

  **Fields.user**

Property         | Description
-----------------|-----------------
`userID`         | The user's ID.
`accountType`    | The type of the user.
`emailVerified`  | Whether or not the user has verified their email address.


  **Fields.token**

Property         | Description
-----------------|-----------------
`token`          | The Auth0 token.
`refreshToken`   | The date at which the token expires.
