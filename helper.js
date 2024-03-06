const helpers = function() {}

helpers.MapAccessibility = function(input) {
  if (input <= 0.25) {
    return 'High'
  }
  else if (input > 0.25 && input <= 0.75){
    return 'Medium'
  }
  else if (input > 0.75){
    return 'Low'
  }
}

helpers.MapPrice = function(input) {
  if (input == 0){
    return 'Free'
  }
  else if (input <= 0.5){
    return 'Low'
  }
  else if (input > 0.5){
    return 'High'
  }
}

helpers.MaxAccessibility = function(input) {
  // for this exercise, i am using accessibility to mean 'accessibility requirements'
  // that is, if a user has High accessibility requirements, their options are limited
  // if they have low accessibility requirements, their options include high and medium
  if (input == 'High'){
    return 0.25
  }
  else if (input == 'Medium'){
    return 0.75
  }
  else if (input == 'Low'){
    return 1
  }
}

helpers.MaxPrice = function(input) {
  // in the reverse way, price represents the highest price tolerance
  // high will include all other prices, low will only include free, and free will be limited
  if (input == 'High'){
    return 1
  }
  else if (input == 'Low'){
    return 0.5
  }
  else if (input == 'Free'){
    return 0
  }
}

helpers.BuildQueryString = function(input) {
  // helper function to insert '&' when combining query strings
  // but not if its the first time after the '?'
  if (input.slice(-1) == '?'){
    return ''
  }
  else {
    return '&'
  }
}

module.exports = helpers
