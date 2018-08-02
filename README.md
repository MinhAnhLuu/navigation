# CircuitSimulator

## Requirements

Make sure that you installed these packages before running

* [Node.js](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)
* [NPM](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server)
* Python 2.7
* Pip

## How to run
* Install globally some packages: `npm install -g nodemon`
* Clone project: `git clone https://thgnguyen@bitbucket.org/emlab-uiuc/csim.git`
* Go to folder of current project: `cd CircuitSimulator`
* Install packages listed in `package.json`: `npm install`
* Setup Python:  
1. Check python version by command `python -V`. It should be version 2.7 (not 3.0+)  
2. Install numpy: `pip install numpy`  
3. Make sure that this command runs sucessfully: `python server/lib/execute/cs-example-1.py 1 1 1 1 1 1 1 1 1 100`  
* Run project: `npm start`
* Access `http://localhost:3000` and `http://localhost:3333` via your browser
* To use plotting function, access `http://localhost:3000/example-1`

## Document and references
* [React](https://facebook.github.io/react/)
* [React Router](https://reacttraining.com/react-router/)
* [Express](https://expressjs.com/)
* [Create React App](https://github.com/facebookincubator/create-react-app)
* [Babel](https://babeljs.io/)
* [Using create-react-app with React Router + Express.js](https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d)

## Keywords
Nodejs, Express, React, React Router, Babel
