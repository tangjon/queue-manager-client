export const environment = {
  // Meta Data
  appVersion: 'v2.20',
  appName: 'Queue Manager Cloud Dispatcher',
  appShort: 'QMCD',
  production: true,   // Compile for production: npm run build-prod

  // Hana Cloud API
  apiUrl: 'https://qmdatabasep2000140239trial.hanatrial.ondemand.com/qmapi_prod/data.xsodata/',

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
