## Submission for the Take Home Assessment of the Coding Challenge for Glia.

### Simplified Prompt:
```
Create an Express.js REST API to suggest an activity based on Bored API's activity endpoint.

Also allow the ability to store a user profile which limits which results are returned
```

### Use:
1. Download the code and navigate locally to the folder in a command line
2. Run ```node index.js``` to run the server

This server runs on port 3000.

### Endpoints:
```GET api/activity``` - returns an activity, modified to map the values as outlined in the assignment. If a user profile is present, will restrict activities based on the profile.

```POST api/user``` - saves the user profile. Requires a json with the following shape: 
```
{
  "name": string (mandatory),
  "accessibility": string("High|Medium|Low") (optional),
  "price": string("Free|Low|High") (optional)
}
```
