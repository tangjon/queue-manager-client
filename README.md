# Queue Manager Web App 2.0

An unofficial tool to aid and assist Support Engineers assign and distribute customer incidents. This is an overhaul of the original: https://github.com/qianyilun/Queue-Manager-Cloud-Dispatcher.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1. NodeJs
2. Angular Firebase
3. Angular-Cli
4. Angular Firebase Tools (Not needed)
5. Git Bash

### Installing

1. Install [Node.js](https://nodejs.org/en/)
2. Through the Node Js command line run:
```
npm install // should install all dependencies
```

## Local Development
Please note that local development is on a seperate API/Database. Changes will not be made to the production system.

To start application run:
```
ng serve
```

## Deployment to Production
Compile the application into static folder with static files

To compile the folder:
```
npm run build-prod
```
### Phase 1: Push to repositories
```
Double click on deploy.sh through Windows - pushes application
Double click on deploy-doc.sh through Windows - pushes docs
```
### Phase 2: Deploy to Cloud Platform
Head over to Hana Cloud Cockpit & Navigate to Web IDE
   * Hit Pull
   * Right Click Project Folder -> Hana Cloud -> Deploy Existing 'queuemanager'
   * DONE!

These links are all you need
- [Application Link](https://queuemanager-p2000140239trial.dispatcher.hanatrial.ondemand.com/#/qm/NW) - Application Home
- [Web IDE](https://webide-p2000140239trial.dispatcher.hanatrial.ondemand.com/index.html) - Deployment & Make project live
- [WorkBench](https://qmdatabasep2000140239trial.hanatrial.ondemand.com/sap/hana/ide/) - Database and API Exposure

## Built With

* [Firebase](https://firebase.google.com/) - Database
* [AngularFire2](https://www.npmjs.com/package/angularfire2)
* [Angular](https://angular.io/) - Front-end web framework
* [NodeJs](https://nodejs.org/en/) - Dependency Management
* [Boostrap](https://getbootstrap.com/) - Styling
* [Font-Awesome](https://fontawesome.com/) - Styling


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://github.com/qianyilun
