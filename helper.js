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

module.exports = helpers
