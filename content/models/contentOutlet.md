## Content Outlets

A Content Outlet is a platform that a Content Producer uses to create content, such as Youtube.

### Schema

```
{
  channelName: {
    type: String,
    required: true
  },
  channelID: {
    type: String,
    required: true
  },
  profilePicture: String,
  channelLink: {
    type: String,
    required: true
  },
  owner: {
    ownerType: {
      type: String,
      required: true
    },
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'owner.ownerType',
      required: true
    }
  },
  lastUpdated: {
    type: Date,
    default: () => new Date().toISOString()
  }
}
```

#### Example Content Producer
```json
{
  "_id": "ji83ik2l99s9sl2klk1fj",
  "channelName": "The Cool Channel",
  "channelID": "lijfoa98sujf2k3j1lk2j",
  "profilePicture": "https://example.com/image/lakjsdlfkj.jpg",
  "channelLink": "https://example.com/lijfoa98sujf2k3j1lk2j",
  "owner": {
    "ownerType": "ContentProducer",
    "ownerID": "lakjdsflkj12lkj309",
  },
  "lastUpdated": "2018-02-20T00:32:16.220Z"
}
```

  **Fields**

Property         | Description
-----------------|-----------------
`channelName`    | The name of the channel, pulled from the Youtube API.
`channelID`      | The ID of the ContentOutlet, pulled from the Youtube API.
`profilePicture` | The profile picture of the ContentOutlet, pulled from the Youtube API.
`channelLink`    | A URL pointing to the ContentOutlet, pulled from the Youtube API.
`owner`          | The account which owns this ContentOutlet.

 - **Fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of account this ContentOutlet belongs to.
`ownerID`   | The ID of the account this ContentOutlet belongs to.


