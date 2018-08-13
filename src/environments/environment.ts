// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import {qmtoolconfig} from '../../qmtoolconfig'
export const environment = {
  // Meta Data
  appVersion: 'v3.0',
  last_updated: 'July 2018',
  appName: 'Queue Manager Cloud Dispatcher',
  appShort: 'QMCD',
  production: false,

  // LOCAL QM API
  api : 'http://localhost:8082/api',
  ws_url : 'http://localhost:8082',
  doc_url : 'https://queuemanagerdocumentation-p2000140239trial.dispatcher.hanatrial.ondemand.com/additional-documentation/introduction.html',

  // Firebase config and api
  firebaseRootUrl: 'dev',
  firebase: {
    apiKey: "AIzaSyCoesP_YkwMmpJaGWO3PO7A9VgjnrrmlxQ",
    authDomain: "queue-manager-fb-ajs.firebaseapp.com",
    databaseURL: "https://queue-manager-fb-ajs.firebaseio.com",
    projectId: "queue-manager-fb-ajs",
    storageBucket: "queue-manager-fb-ajs.appspot.com",
    messagingSenderId: "1044152156042"
  },

  // Local Storage Variable
  KEY_CACHE_INUMBER: 'USER_INUMBER'
};
