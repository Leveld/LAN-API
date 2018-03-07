## Campaign

### Schema

```javascript-left
{
  contracts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contract'
  }],
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
  status: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  preferredApplicant: {
    coType: {
      type: String,
      required: true
    },
    minViews: {
      type: Number,
      default: 0
    },
    minSubscribers: {
      type: Number,
      default: 0
    },
    industry: {
      type: String,
      required: true
    }
  },
  description: {
    type: String
  },
  contractTemplate: {
    payout: {
      amount: {
        type: Number
      },
      payoutType: {
        type: String
      }
    },
    contractLength: {
      type: Number
    },
    name: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    advertiser: {
      advertiserType: {
        type: String,
        default: function() {
          return this.owner.ownerType
        }
      },
      advertiserID: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'contractTemplate.advertiser.advertiserType',
        default: function() {
          return this.owner.ownerID
        }
      }
    }
  },
  rules: [{
    type: String
  }]
}
```

#### Example Campaign

```json
{
  "_id": "rnf5sl9976kwec8k1fj",
  "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs"],
  "owner": {
    "ownerType": "Business",
    "ownerID": "lakjdsflkj12lkj309"
  },
  "status": "Active",
  "images": [],
  "preferredApplicant": {
    "coType": "YouTube",
    "minViews": 10000,
    "minSubscribers": 5000,
    "industry": "Gaming"
  },
  "contractTemplate": {
    "payout": {
      "amount": 500,
      "payoutType": "Monthly"
    },
    "contractLength" : 21,
    "advertiser": {
      "advertiserType": "Business",
      "advertiserID": "lakjdsflkj12lkj309"
    }
  },
  "createdAt": "2018-02-20T00:32:16.220Z",
  "lastUpdated": "2018-03-05T00:32:16.220Z"
}
```

**Fields**

Property             | Description
---------------------|-----------------
`contracts`          | An array of contract IDs associated with the campaign.
`owner`              | The account which owns this ContentOutlet.
`status`             | The status of the campaign.
`preferredApplicant` | The criteria for a preferred applicant.
`contractTemplate`   | The template of contracts to be associated with the campaign.


 - **Fields.preferredApplicant**

Property             | Description
---------------------|-----------------
`coType`             | The type of the Content Outlet. For example, YouTube
`minViews`           | The minimum number of views the Content Outlet has received.
`minSubscribers`     | The minimum number of subscribers the Content Outlet has received.
`industry`           | The industry to Content Outlet belongs to. For example, gaming or fashion.


  - **Fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of account this ContentOutlet belongs to.
`ownerID`   | The ID of the account this ContentOutlet belongs to.

  - **Fields.contractTemplate**

Property                    | Description
----------------------------|------------
`payout.amount`             | The amount the contract will pay.
`payout.payoutType`         | How often the contract will pay.
`contractLength`            | The length of the contract in days.
`advertiser.advertiserType` | The type of the advertiser.
`advertiser.advertiserID`   | The id of the advertiser.

