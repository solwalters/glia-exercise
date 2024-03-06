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
    url = `http://www.boredapi.com/api/activity?`
    let user = await db.GetLatestUser()
    console.log('using latest user: ', user)
    if (user.accessibility != null){
      var maxAccessibility = helper.MaxAccessibility(user.accessibility)
      var minAccessibility = 0
      url = url + helper.BuildQueryString(url) + `minaccessibility=${minAccessibility}&maxaccessibility=${maxAccessibility}`
    }
    if (user.price != null){
      var maxPrice = helper.MaxPrice(user.price)
      var minPrice = 0
      url = url + helper.BuildQueryString(url) + `minprice=${minPrice}&maxprice=${maxPrice}`
    }
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
