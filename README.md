# Queue Manager Web App 2.0

An unofficial tool to aid and assist in daily operations and reduce redundency. An improvement of the original: https://github.com/qianyilun/Queue-Manager-Cloud-Dispatcher

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

1. NodeJs
2. Angular Firebase
3. Angular-Cli
4. Angular Firebase Tools (Not needed)

### Installing

1. Install Node.Js [I'm an inline-style link](https://www.google.com)

In the command line with Node.Js installed

```
npm install // should install all dependencies
```

## Local Development
```
ng serve
```

## Deployment to Production
Build static folder
```
npm run build-prod
```
Copy folder 'last-build' somewhere outside of the working directory i.e Desktop. Then commit and push files to a different repo.
```
git remote add origin https://gitlab.com/tangjon/Queue-Manager-FB-AJS.git
git add . // add everything
git commit -m "deploy" // message can be anything really
git push -f // probably will ask to you to push upstream do that.
```
Head over to Hana Cloud Cockpit & Navigate to Web IDE
   * Hit Reset Button (HARD)
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
