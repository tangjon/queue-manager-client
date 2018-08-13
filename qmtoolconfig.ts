let VMIP = "http://10.160.202.19" // VIRTUAL MACHINE IP ADDRESS
export const qmtoolconfig = {
  'prod' : {
    api: VMIP + ':8081/api',
    ws_url : VMIP + ':8081',
  },
  'dev' : {
    api: VMIP + ':8082/api',
    ws_url : VMIP + ':8082',
  },
  'sandbox':{
    api: VMIP + ':8083/api',
    ws_url : VMIP + ':8083',
  }
};
