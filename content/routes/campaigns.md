## Campaigns

### Get

Get a Campaign.

```endpoint
GET /campaign?id={CAMPAIGN_ID}
```

#### Example request

```curl
$ curl $url$campaign?id=rnf5sl9976kwec8k1fj \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$campaign', {
  params: {
    id: 'rnf5sl9976kwec8k1fj'
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
  "_id": "rnf5sl9976kwec8k1fj",
  "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs"],
  "status": "Active",
  "images": [],
  "preferredApplicant": {
    "coType": "YouTube",
    "minViews": 10000,
    "minSubscribers": 5000,
    "industry": "Gaming"
  },
  "owner": {
    "ownerType": "Business",
    "ownerID": "lakjdsflkj12lkj309"
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

**Parameters**

Property | Description
---------|---------
`id`     | The `id` of the Campaign.


### Create

Create a Campaign.

```endpoint
POST /campaign
```

#### Example request

```curl
$ curl -v -XPOST $url$campaign \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "fields": {
    "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs"],
    "status": "Active",
    "images": [],
    "preferredApplicant": {
      "coType": "YouTube",
      "minViews": 10000,
      "minSubscribers": 5000,
      "industry": "Gaming"
    },
    "owner": {
      "ownerType": "Business",
      "ownerID": "lakjdsflkj12lkj309"
    },
    "contractTemplate": {
      "payout": {
        "amount": 500,
        "payoutType": "Monthly"
      }
      "contractLength" : 21,
      "advertiser": {
        "advertiserType": "Business",
        "advertiserID": "lakjdsflkj12lkj309"
      }
    }
  }
}'
```

```javascript
axios.post('$url$campaign', {
    fields: {
      contracts: ["dksaj439dszxck93", "sdm29sjdka3fs"],
      status: "Active",
      images: [],
      preferredApplicant: {
        coType: "YouTube",
        minViews: 10000,
        minSubscribers: 5000,
        industry: "Gaming"
      },
      owner: {
        ownerType: "Business",
        ownerID: "lakjdsflkj12lkj309"
      },
      contractTemplate: {
        payout: {
          amount: 500,
          payoutType: "Monthly"
        }
        contractLength : 21,
        advertiser: {
          advertiserType: "Business",
          advertiserID: "lakjdsflkj12lkj309"
        }
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
  "_id": "rnf5sl9976kwec8k1fj",
  "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs"],
  "status": "Active",
  "images": [],
  "preferredApplicant": {
    "coType": "YouTube",
    "minViews": 10000,
    "minSubscribers": 5000,
    "industry": "Gaming"
  },
  "owner": {
    "ownerType": "Business",
    "ownerID": "lakjdsflkj12lkj309"
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

**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Campaign schema.


 - **fields**

Property             | Description
---------------------|-----------------
`contracts`          | An array of contract IDs associated with the campaign.
`status`             | The status of the campaign.
`preferredApplicant` | The criteria for a preferred applicant.
`owner`              | The account which owns this ContentOutlet.
`contractTemplate`   | The template of contracts to be associated with the campaign.


 - **fields.preferredApplicant**

Property             | Description
---------------------|-----------------
`coType`             | The type of the Content Outlet. For example, YouTube
`minViews`           | The minimum number of views the Content Outlet has received.
`minSubscribers`     | The minimum number of subscribers the Content Outlet has received.
`industry`           | The industry to Content Outlet belongs to. For example, gaming or fashion.


 - **fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of account this ContentOutlet belongs to.
`ownerID`   | The ID of the account this ContentOutlet belongs to.

 - **fields.contractTemplate**

Property                    | Description
----------------------------|------------
`payout.amount`             | The amount the contract will pay.
`payout.payoutType`         | How often the contract will pay.
`contractLength`            | The length of the contract in days.
`advertiser.advertiserType` | The type of the advertiser.
`advertiser.advertiserID`   | The id of the advertiser.



### Update

Update a Campaign.

```endpoint
PATCH /campaign
```

#### Example request

```curl
$ curl -v -XPATCH $url$campaign \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "id": "rnf5sl9976kwec8k1fj",
  "fields": {
    "payout": {
      "amount": 100,
      "payoutType": "Weekly"
    }
  }
}'
```

```javascript

axios.patch('$url$campaign', {
    id: 'rnf5sl9976kwec8k1fj',
    fields: {
      payout: {
        amount: 100,
        payoutType: "Weekly"
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
  "_id": "rnf5sl9976kwec8k1fj",
  "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs"],
  "status": "Active",
  "images": [],
  "preferredApplicant": {
    "coType": "YouTube",
    "minViews": 10000,
    "minSubscribers": 5000,
    "industry": "Gaming"
  },
  "owner": {
    "ownerType": "Business",
    "ownerID": "lakjdsflkj12lkj309"
  },
  "contractTemplate": {
    "payout": {
      "amount": 100,
      "payoutType": "Weekly"
    },
    "contractLength" : 21,
    "advertiser": {
      "advertiserType": "Business",
      "advertiserID": "lakjdsflkj12lkj309"
    }
  },
  "createdAt": "2018-02-20T00:32:16.220Z",
  "lastUpdated": "2018-03-06T00:32:16.220Z"
}
```
**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Campaign schema.


 - **fields**

Property             | Description
---------------------|-----------------
`contracts`          | An array of contract IDs associated with the campaign.
`status`             | The status of the campaign.
`preferredApplicant` | The criteria for a preferred applicant.
`owner`              | The account which owns this ContentOutlet.
`contractTemplate`   | The template of contracts to be associated with the campaign.


 - **fields.preferredApplicant**

Property             | Description
---------------------|-----------------
`coType`             | The type of the Content Outlet. For example, YouTube
`minViews`           | The minimum number of views the Content Outlet has received.
`minSubscribers`     | The minimum number of subscribers the Content Outlet has received.
`industry`           | The industry to Content Outlet belongs to. For example, gaming or fashion.


 - **fields.owner**

Property    | Description
------------|------------
`ownerType` | The type of account this ContentOutlet belongs to.
`ownerID`   | The ID of the account this ContentOutlet belongs to.

 - **fields.contractTemplate**

Property                    | Description
----------------------------|------------
`payout.amount`             | The amount the contract will pay.
`payout.payoutType`         | How often the contract will pay.
`contractLength`            | The length of the contract in days.
`advertiser.advertiserType` | The type of the advertiser.
`advertiser.advertiserID`   | The id of the advertiser.





### Add Contract

Add a Contract to a Campaign


```endpoint
PATCH /campaign/contract
```

#### Example request


```curl
$ curl -v -XPATCH $url$campaign/contract \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "id": "rnf5sl9976kwec8k1fj",
  "contractID": "asksa12ajdn324ad0"
}'
```

```javascript

axios.patch('$url$campaign/contract', {
    id: "rnf5sl9976kwec8k1fj",
    contractID: "asksa12ajdn324ad0"
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
  "_id": "rnf5sl9976kwec8k1fj",
  "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs", "asksa12ajdn324ad0"],
  "status": "Active",
  "images": [],
  "preferredApplicant": {
    "coType": "YouTube",
    "minViews": 10000,
    "minSubscribers": 5000,
    "industry": "Gaming"
  },
  "owner": {
    "ownerType": "Business",
    "ownerID": "lakjdsflkj12lkj309"
  },
  "contractTemplate": {
    "payout": {
      "amount": 100,
      "payoutType": "Weekly"
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

**Parameters**

Property        | Description
----------------|----------------
`id`            | The ID of the campaign to add the contract to.
`contractID`    | The ID of the contract to add the comapign.




### Get All

Get all Campaigns.

```endpoint
GET /campaigns
```

#### Example request

```curl
$ curl $url$campaigns \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$campaigns', {
  headers: {
    Authorization: `Bearer ${userToken}`,
    withCredentials: true
  }
});
```

#### Example response

```json
[
  {
    "_id": "rnf5sl9976kwec8k1fj",
    "contracts": ["dksaj439dszxck93", "sdm29sjdka3fs", "asksa12ajdn324ad0"],
    "status": "Active",
    "images": [],
    "preferredApplicant": {
      "coType": "YouTube",
      "minViews": 10000,
      "minSubscribers": 5000,
      "industry": "Gaming"
    },
    "owner": {
      "ownerType": "Business",
      "ownerID": "lakjdsflkj12lkj309"
    },
    "contractTemplate": {
      "payout": {
        "amount": 100,
        "payoutType": "Weekly"
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
]
```
