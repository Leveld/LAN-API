## Contract

### Schema


```javascript-left
{
  name: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  payout: {
    amount: {
      type: Number,
      required: true
    },
    payoutType: {
      type: String,
      enum: ['Per Video', 'Daily', 'Weekly', 'Monthly', 'Bi-Weekly', 
            'Monthly', 'On Completion'],
      required: true
    }
  },
  contractLength: {
    type: Number,
    required: true
  },
  advertiser: {
    advertiserType: {
      type: String,
      required: true
    },
    advertiserID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'advertiser.advertiserType',
      required: true
    }
  },
  contentProducer: {
    contentProducerType: {
      type: String,
      required: true
    },
    contentProducerID: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'contentProducer.contentProducerType',
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Frozen', 'Terminated', 'Closed', 'Completed'],
    default: 'Inactive'
  }
}, { timestamps: true });

```

#### Example Contract
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


 - **Fields**

Property             | Description
---------------------|-----------------
`name`               | The name of the contract.
`description`        | The description of the contract.
`payout`             | Information relating to the payout of the contract.
`contractLength`     | The length of the contract in days.
`advertiser`         | Information relating to the advertiser associated with the contract.
`contentProducer`    | Information relating to the content producer associated with the contract.
`status`             | The status of the contract. Can be one of the following values: Active, Inactive, Frozen, Terminated, Closed, Completed.

 - **Fields.payout**

Property             | Description
---------------------|-----------------
`amount`             | The amount the contract will pay.
`payoutType`         | How often the contract will pay. Can be one of the following values: Per Video, Daily, Weekly, Monthly, Bi-Weekly, Monthly, On Completion.

 - **Fields.advertiser**

Property             | Description
---------------------|-----------------
`advertiserType`     | The type of the advertiser.
`advertiserID`       | The id of the advertiser.

 - **Fields.contentProducer**

Property             | Description
---------------------|-----------------
`contentProducerType`| The type of the content producer.
`contentProducerID`  | The id of the content producer.



