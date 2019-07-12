import AdminRequest from './request/AdminRequest';
// import UserRequest from '../requests/UserRequest';
// import SettingRequest from '../requests/SettingRequest';
// import FeeRequest from '../requests/FeeRequest';
// import NoticeRequest from '../requests/NoticeRequest';
// import NotificationRequest from '../requests/NotificationRequest';
// import NewRequest from '../requests/NewRequest';
// import EventRequest from '../requests/EventRequest';
const requestMap = {
  AdminRequest,
//   UserRequest,
//   SettingRequest,
//   NoticeRequest,
//   FeeRequest,
//   NotificationRequest,
//   NewRequest,
//   EventRequest
};

const instances = {};

export default class RequestFactory {

  static getRequest(classname) {
   
    let RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error('Invalid request class name: ' + classname);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
        requestInstance = new RequestClass();
        instances[classname] = requestInstance;
    }

    return requestInstance;
  }

}
