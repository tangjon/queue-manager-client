# Queue Manager Web App 3.0

This documentation is for setting up the EPM QM Tool. Refer to UserDocumentation for information on how to use this tool.

Live link: https://queuemanager-p2000140239trial.dispatcher.hanatrial.ondemand.com/

# Setup Front end (Angular 6)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development. For deployment, refer to the deployment section below.

### Prerequisites

Things you need to install on your machine

1. Node.js (https://nodejs.org/en/)
2. Git (https://git-scm.com/)

### Installing

Through the Node.js command line run:

```
npm install // This will install all dependencies
```

# Start the application : Development and Productions Environments

## Environments
These are following environments set up to be used for this project. Treat these environment as separate entities. No data is shared between them.

DEVELOPMENT:

Development Environment with local Database
- requires MySQL database on local machine
```$xslt
ng serve OR npm run start
```

Development Environment with VM Database
- connects local front-end application to MySQL development database located on VM
- Backend server located on VM PORT 8082 i.e http://< vmip >:8082
```$xslt
npm run start-vm
```

PRODUCTION:

Production Environment with VM Database - For production use.
- do not develop on this
```$xslt
npm run build-prod // compiles the project for production. Outputs folder 'build-prod'
```

## Compile Production or Development Application for Deployment
Compile the application into static folder with static files to server by an HTTP server. 

Currently an IIS server should be pointed to 'build-prod'
- this folder contains the production application users will see

The following commands will compile the project files to served to the clients.
```
**For prod
npm run build-prod // outputs 'build-prod'

**For dev
npm run build-dev //ouputs 'build-dev'
```

## Included Bash Commands that can be ran:

Update.sh - Resets the project state and pulls the updates project files

Deploy.sh - Compiles the production version of the app. Outputs "build-prod folder"


# Backend End
The front end needs a backend to talk to. Here it is. The backend with process the requests and query the database as needed.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1. NodeJs
2. Git Bash
3. MySQL Community Server

### Installing

## Install MySQL Community Server & Workbench
All files needed are present in generate folder.
- model.mwb: The containing the database structure for prod,dev,sandbox
- initialize db tables.sql: Pure sql that creates the tables needed for application
- generate.sql: Run this to initialize application with standard data. User: i100000
- generate_test.sql: Run this to populate application with dummy data


## Install dependencies
1. Install [Node.js](https://nodejs.org/en/)
2. Through the Node Js command line run:

```
npm install // This will install all dependencies
```

3. Create a file in backend directory on the same level of app.js named "SECRET.js" (no quotes)

paste the following 

### Starting Production Server
```
npm run start-prod
```

### Starting Development Server
```
npm run start-dev
```

## Built With

* [Firebase](https://firebase.google.com/) - Database
* [AngularFire2](https://www.npmjs.com/package/angularfire2)
* [Angular](https://angular.io/) - Front-end web framework
* [NodeJs](https://nodejs.org/en/) - Dependency Management
* [Bootstrap](https://getbootstrap.com/) - Styling
* [Font-Awesome](https://fontawesome.com/) - Styling


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://github.com/qianyilun
