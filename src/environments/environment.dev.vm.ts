export const environment = {


  // Meta Data
  appVersion: '3.0',
  last_updated: 'July 2018',
  appName: 'Queue Manager Cloud Dispatcher',
  appShort: 'QM 3',
  production: false,   // Compile for production: npm run build-prod

  // Hana Cloud API
  apiUrl: 'https://qmdatabasep2000140239trial.hanatrial.ondemand.com/qmapi_prod/data.xsodata/',
  // LOCAL QM API
  api: 'http://10.160.199.221:8081/api',

  /* Firebase, realtime functionality */
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
