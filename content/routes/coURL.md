### Get URL

Get a URL to redirect a user to, to authenticate a new ContentOutlet.

```endpoint
GET /coURL
```

#### Example request

```curl
$ curl %url%coURL?type=google&redirect=example%2Fpath \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('%url%outlet', {
  params: {
    type: 'google',
    redirect: 'example/path'
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
  "url" : "https://accounts.google.com/o/oauth2/v2/auth?sdkjflksdjflksdfjdnf"
}
```

Property   | Description
-----------|-----------
`type`     | The type of the Content Outlet to create.
`redirect` | (optional) The URL to redirect the user to. URL should be relative to the frontend server root. (ie. `example/path` will redirect to `%url%example/path`)
