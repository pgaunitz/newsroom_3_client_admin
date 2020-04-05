### Authors
[Emma-Maria Thalen](https://github.com/emtalen)  
[Philip Gaunitz](https://github.com/pgauntiz)  
[Carlos Delgado](https://github.com/Carltesio)  
[Janko Radakovic](https://github.com/MadFarmer101)
[Lautaro Parra](https://github.com/MadFarmer101) 

## Built with
**Front End:** React v.16.12.0 | CSS  
**Testing framework:** Cypress  
**Deployed at:** [Netlify](https://admin-marstimes.netlify.com/).

## The code   
This project is the Admin user interface of our Newspaper app Mars Times. Here journalists can log in to create articles and editors can log in to publish articles. 
The master repository for the visitors interface, mobile app and API can be found here:
* [API](https://github.com/CraftAcademy/newsroom_3_api.git)
* [Visitor](https://github.com/CraftAcademy/newsroom_3_client_user.git)
* [Mobile](https://github.com/CraftAcademy/newsroom_3_mobile_app.git)

## Getting started
### Dependencies  
* Yarn
* React
* Cypress
* Axios
* Semantic-ui-react / Semantic-ui-css
* React-images-uploading
* React-redux
* Redux
* Redux-thunk
* J-tockauth

### Setup   
To test this application, fork the repo to your own GitHub account and clone it to your local workspace. </br>
*Note:*All our clients are running on our deployed API, even when they are being used on a local server. 
Install all of the dependencies:    
```
$ yarn install
```  
Start cypress and run the feature tests:  
```
$ yarn run cy:open
```
Start the React application and run it on your local host:
```
$ yarn start
```

### Login credentials
- Journalist: email: journalist@mail.com password: password
- Editor: email: editor@mail.com password: password

## Updates/Improvements   
- Functionaliy for the journalist to view all his/hers articles and edit and delete them
- Functionality for the editor to review articles and leave comments for the journalist
- Functionality for an admin to log in an create journlist and editor accounts

## License  
[MIT-license](https://en.wikipedia.org/wiki/MIT_License)

### Acknowledgement  
- Material provided by [Craft Academy](https://craftacademy.se)
- [Oliver Ochman](https://github.com/oliverochman/) for helping us understanding how to send credentials with the headers for request to the API. 
- [Faraz Naeem](https://github.com/faraznaeem) for demonstrating a tough client and pushing us forward
- Big thanks to the others students in our cohort at Craft Academy. We have been stealing some of your code shamelessly, you have been great rubber ducks and our team internal competition in highest coverage has really helped us implement better skills in RSpec. 