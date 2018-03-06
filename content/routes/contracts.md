## Contracts

### Get

Get a Contract.

```endpoint
GET /contract?id={CONTRACT_ID}
```

#### Example request

```curl
$ curl $url$contract?id=xasjdj3424dsnkl \
-H "Authorization: Bearer USER_TOKEN"
```

```javascript
axios.get('$url$contract', {
  params: {
    id: 'xasjdj3424dsnkl'
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
  "_id": "xasjdj3424dsnkl",
  "name": "Name of Contract",
  "description": "Description of Contract",
  "payout": {
    "amount": 100,
    "payoutType": "Weekly"
  },
  "contractLength" : 21,
  "advertiser": {
    "advertiserType": "Business",
    "advertiserID": "lakjdsflkj12lkj309"
  },
  "contentProducer": {
    "contentProducerType": "YouTube",
    "contentProducerID": "akjd9qsakdm2"
  },
  "status": "Active",
  "createdAt": "2018-02-20T00:32:16.220Z",
  "lastUpdated": "2018-03-05T00:32:16.220Z"
}
```

**Parameters**

Property | Description
---------|---------
`id`     | The `id` of the Contract.



### Create

Create a Contract.

```endpoint
POST /contract
```

#### Example request

```curl
$ curl -v -XPOST $url$outlet \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "fields": {
    "name": "Name of Contract",
    "description": "Description of Contract",
    "payout": {
      "amount": 100,
      "payoutType": "Weekly"
    },
    "contractLength" : 21,
    "advertiser": {
      "advertiserType": "Business",
      "advertiserID": "lakjdsflkj12lkj309"
    },
    "contentProducer": {
      "contentProducerType": "YouTube",
      "contentProducerID": "akjd9qsakdm2"
    },
    "status": "Active",
  }
}'
```

```javascript
axios.post('$url$outlet', {
    fields: {
      name: "Name of Contract",
      description: "Description of Contract",
      payout: {
        amount: 100,
        payoutType: "Weekly"
      },
      contractLength : 21,
      advertiser: {
        advertiserType: "Business",
        advertiserID: "lakjdsflkj12lkj309"
      },
      contentProducer: {
        contentProducerType: "YouTube",
        contentProducerID: "akjd9qsakdm2"
      },
      status: "Active",
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
  "_id": "xasjdj3424dsnkl",
  "name": "Name of Contract",
  "description": "Description of Contract",
  "payout": {
    "amount": 100,
    "payoutType": "Weekly"
  },
  "contractLength" : 21,
  "advertiser": {
    "advertiserType": "Business",
    "advertiserID": "lakjdsflkj12lkj309"
  },
  "contentProducer": {
    "contentProducerType": "YouTube",
    "contentProducerID": "akjd9qsakdm2"
  },
  "status": "Active",
  "createdAt": "2018-02-20T00:32:16.220Z",
  "lastUpdated": "2018-03-05T00:32:16.220Z"
}
```

**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Contract schema.


 - **fields**

Property             | Description
---------------------|-----------------
`name`               | The name of the contract.
`description`        | The description of the contract.
`payout`             | Information relating to the payout of the contract.
`contractLength`     | The length of the contract in days.
`advertiser`         | Information relating to the advertiser associated with the contract.
`contentProducer`    | Information relating to the content producer associated with the contract.
`status`             | The status of the contract. Can be one of the following values: Active, Inactive, Frozen, Terminated, Closed, Completed.

 - **fields.payout**

Property             | Description
---------------------|-----------------
`amount`             | The amount the contract will pay.
`payoutType`         | How often the contract will pay. Can be one of the following values: Per Video, Daily, Weekly, Monthly, Bi-Weekly, Monthly, On Completion.


 - **fields.advertiser**

Property             | Description
---------------------|-----------------
`advertiserType`     | The type of the advertiser.
`advertiserID`       | The id of the advertiser.

 - **fields.contentProducer**

Property             | Description
---------------------|-----------------
`contentProducerType`| The type of the content producer.
`contentProducerID`  | The id of the content producer.




### Update

Update a Contract.

```endpoint
PATCH /contract
```

#### Example request

```curl
$ curl -v -XPATCH $url$contract \
-H "Authorization: Bearer USER_TOKEN" \
-d '{
  "id": "xasjdj3424dsnkl",
  "fields": {
    "payout": {
      "amount": 500,
      "payoutType": "Monthly"
    }
  }
}'
```

```javascript

axios.patch('$url$contract', {
    id: 'xasjdj3424dsnkl',
    fields: {
      payout: {
        amount: 500,
        payoutType: "Monthly"
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
  "_id": "xasjdj3424dsnkl",
  "name": "Name of Contract",
  "description": "Description of Contract",
  "payout": {
    "amount": 500,
    "payoutType": "Monthly"
  },
  "contractLength" : 21,
  "advertiser": {
    "advertiserType": "Business",
    "advertiserID": "lakjdsflkj12lkj309"
  },
  "contentProducer": {
    "contentProducerType": "YouTube",
    "contentProducerID": "akjd9qsakdm2"
  },
  "status": "Active",
  "createdAt": "2018-02-20T00:32:16.220Z",
  "lastUpdated": "2018-03-06T00:32:16.220Z"
}
```
**Parameters**

Property | Description
---------|---------
`fields` | A key-value Object of properties matching the Contract schema.


 - **fields**

Property             | Description
---------------------|-----------------
`name`               | The name of the contract.
`description`        | The description of the contract.
`payout`             | Information relating to the payout of the contract.
`contractLength`     | The length of the contract in days.
`advertiser`         | Information relating to the advertiser associated with the contract.
`contentProducer`    | Information relating to the content producer associated with the contract.
`status`             | The status of the contract. Can be one of the following values: Active, Inactive, Frozen, Terminated, Closed, Completed.

 - **fields.payout**

Property             | Description
---------------------|-----------------
`amount`             | The amount the contract will pay.
`payoutType`         | How often the contract will pay. Can be one of the following values: Per Video, Daily, Weekly, Monthly, Bi-Weekly, Monthly, On Completion.

 - **fields.advertiser**

Property             | Description
---------------------|-----------------
`advertiserType`     | The type of the advertiser.
`advertiserID`       | The id of the advertiser.

 - **fields.contentProducer**

Property             | Description
---------------------|-----------------
`contentProducerType`| The type of the content producer.
`contentProducerID`  | The id of the content producer.
