This project aligns with the purpose of learning as stipulated by the organisers of fullstack open project.

# Deploy to HEROKU 

https://fullstackopen-project-app.herokuapp.com/

Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Clone the repository
Use Git to clone fullstackopen-app's source code to your local machine.

$ heroku git:clone -a fullstackopen-project-app
$ cd fullstackopen-project-app
Deploy your changes
Make some changes to the code you just cloned and deploy them to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
# Config
heroku config:set MONGODB_URI=Alex