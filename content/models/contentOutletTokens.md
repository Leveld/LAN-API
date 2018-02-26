## OAuth 2.0 Tokens

These are the OAuth 2.0 tokens required to make API calls on behalf of users.

### Schema

```
{
  token: {
    token: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
    },
    expires: {
      type: Date,
      required: true
    }
  },
  contentOutlet: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}
```

#### Example 

```json
{
  "token": {
    "token": "m98dsldj19jakjc90ajlyrree",
    "refreshToken": "rpv1wlildj19jakjc90ajlyr87zqtt6n",
    "expires": "2018-02-20T00:32:16.220Z"
  },
  "contentOutlet": "ji83ik2l99s9sl2klk1fj"
}
```
  **Fields**

Property         | Description
-----------------|-----------------
`token`          | The OAuth 2.0 tokens
`contentOutlet`  | The ID of the Content Outlet these tokens are associated with.

  **Fields.token**

Property         | Description
-----------------|-----------------
`token`          | The access token, which is used to make authenticated API calls. Expires after 1 hour.
`refreshToken`   | The refresh token, which is used to get a new access token.
`expires`        | The date at which the access token expires.
