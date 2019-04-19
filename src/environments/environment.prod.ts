import {qmtoolconfig} from '../../qmtoolconfig';

export const environment = {


  // Meta Data
  appVersion: '3.0',
  last_updated: 'July 2018',
  appName: 'Queue Manager Cloud Dispatcher',
  appShort: 'QMCD',
  production: true,   // Compile for production: npm run build-prod

  // VM QM API
  api: qmtoolconfig.prod.api,
  ws_url: qmtoolconfig.prod.ws_url,
  doc_url: 'https://queuemanagerdocumentation-p2000140239trial.dispatcher.hanatrial.ondemand.com/additional-documentation/introduction.html',

  /* Firebase, realtime functionality */
  firebaseRootUrl: 'prod',
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
