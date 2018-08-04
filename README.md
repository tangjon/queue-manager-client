# Queue Manager Web App 3.0

The goal of the tool is help the EPM Queue Manager distribute incident workload more efficiently to individual engineers. It highlights the next available engineer that should receive another incident for processing

# Front end

An unofficial tool to aid and assist EPM Support Engineers assign and distribute customer incidents. This is an overhaul of the original: https://github.com/qianyilun/Queue-Manager-Cloud-Dispatcher.

Live link: https://queuemanager-p2000140239trial.dispatcher.hanatrial.ondemand.com/

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1. NodeJs
2. Git Bash

### Installing

1. Install [Node.js](https://nodejs.org/en/)
2. Through the Node Js command line run:

```
npm install // This will install all dependencies
```

### Environments
These are following environments set up to be used for this project. Treat these environment as separate entities. No data is shared between them.
1. Development Environment with local Database - For testing and development use.
2. Production Environment with VM Database - For production use.

Extra Environments
1. Development Environment with VM Database - For testing and development use. This connects the front-end application to the development server on VM.

## Start Local Development Environment
This environment connects front-end to a local mysql database on port 8082.

i.e http://localhost:8082/api

To start application run:
```
ng serve OR npm run start
```

## Start VM Development Environment
This environment connects front-end to a mysql database located on the VM on port 8082.

i.e http://<server-ip>:8082/api

To start application run:
```
npm run start-vm
```

## Compile Production Application for deployment 
Compile the application into static folder with static files to server by an HTTP server. i.e IIS Manager

The following command will output a folder "build-prod", containing a static version of application to be put on an HTTP Server to server and read
```
**For prod
npm run build-prod

**For dev
npm run build-dev
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
