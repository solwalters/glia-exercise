const express = require('express')
const router = express.Router()
const helper = require('./helper')
const db = require('./database')
const Ajv = require('ajv')
const ajv = new Ajv()

router.get('/activities', async function(req, res){
  let userCount = await db.GetUsersCount()
  let url = null
  if (userCount == 0) {
    console.log('No users found, no restrictions on activity.')
    url = 'http://www.boredapi.com/api/activity'
  }
  else {
    let user = await db.GetLatestUser()
    console.log('using latest user: ', user)
    // for this exercise, i am using accessibility to mean 'accessibility requirements'
    // that is, if a user has High accessibility requirements, their options are limited
    // if they have low accessibility requirements, their options include high and medium
    let maxAccessibility = 1, minAccessibility = 0
    let maxPrice = 1, minPrice = 0
    if (user.accessibility == 'High'){
      maxAccessibility = 0.25
    }
    else if (user.accessibility == 'Medium'){
      maxAccessibility = 0.75
    }
    else if (user.accessibility == 'Low'){
      maxAccessibility = 1
    }
    // in the reverse way, price represents the highest price tolerance
    // high will include all other prices, low will only include free, and free will be limited
    if (user.price == 'High'){
      maxPrice = 1
    }
    else if (user.price == 'Low'){
      maxPrice = 0.5
    }
    else if (user.price == 'Free'){
      maxPrice = 0
    }
    url = `http://www.boredapi.com/api/activity?minaccessibility=${minAccessibility}&maxaccessibility=${maxAccessibility}&minprice=${minPrice}&maxprice=${maxPrice}`

  }
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response not ok')
      }
      return response.json()
    })
    .then(data => {
      data["accessibility"] = helper.MapAccessibility(data["accessibility"])
      data["price"] = helper.MapPrice(data["price"])
      res.send(data)
    })
    .catch(error => {
      console.error('Error:', error)
    })
})

router.post('/user', async function(req, res){
  const validSchema =
  {
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "accessibility": {
        "type": "string",
        "enum": [
          "High",
          "Medium",
          "Low"
        ]
      },
      "price": {
        "type": "string",
        "enum": [
          "High",
          "Low",
          "Free"
        ]
      }
    },
    "required": [
      "name"
    ]
  }
  const isValid = ajv.validate(validSchema, req.body)
  let errorMsg = 'Requires a json with the following shape: {"name": string (mandatory), "accessibility": string("High|Medium|Low") (optional), "price": string("Free|Low|High") (optional)}'
  let successMsg = `Successfully added user ${req.body.name}`
  let msg = errorMsg
  if (isValid) {
    msg = successMsg
    let insertUser = await db.InsertUser(req.body.name, req.body.accessibility, req.body.price)
  }
  res.send(msg)
})

module.exports = router
