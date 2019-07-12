
import moment from 'moment';
export const URL_SOCKET = 'http://183.91.11.132:100';
var domain = 'http://183.91.11.132/pvm_api/public/api/auth/';  

// export const URL_SOCKET = 'http://localhost:100/';
// var domain = 'http://127.0.0.1:8000/api/auth/';
// export const URL = 'http://smartkios.local/api';
export const URL = 'http://167.179.117.197';
export const USER_URL = domain + 'user';
export const USERS_URL = domain + 'users';

export const PRODUCT_URL = domain + 'product';
export const CUSTOMER_URL = domain + 'customer';
export const SMS_URL = domain + 'sms';

export const ORDER_URL = domain + 'order';
export const ORDERS_URL = domain + 'orders';

export const BILLING_URL = domain + 'order-billing';

export const ORDER_DETAIL_URL = domain + 'order-detail';
export const CATEGORY_URL = domain + 'product-category';
export const SERVICE_URL = domain + 'product-service';
export const SERVICES_URL = domain + 'product-services';

export const SMS_CATEGORY_URL = domain + 'sms-categories';
export const PERMISSION_URL = domain + 'permission';
export const PERMISSIONS_URL = domain + 'permissions';
export const ROLE_URL = domain + 'role';
export const ROLES_URL = domain + 'roles';

export const APP_URL = domain + 'user';

export const LOGIN_URL = domain + 'login';
export const LOGOUT_URL = domain + 'logout';

export const CRMWORLDFONE_URL = domain + 'worldfone';

export const HOME_URL = domain + 'home';
export const DOMAIN = domain;
export const GENDER_MALE = 0;
export const GENDER_FEMALE = 1;

export const CURRENCY_VND = "VND";
export const CURRENCY_USD = "USD";

export const TYPE_YES = 1;
export const TYPE_NO = 0;

export const SMS_STATUS_ERROR = 'error';
export const SMS_STATUS_SUCCESS = 'success';

export const DEACTIVED = 0;
export const ACTIVED = 1;

export const IS_PUBLISH_YES = 1;
export const IS_PUBLISH_NO = 0;

export const API_URL = domain + '';

export const PRODUCTS = 'products';
export const PRODUCT = 'product';

export const USERS = 'users';
export const USER = 'user';

export const USER_ADD = 'user/store';

export const ADMINISTRATOR = 14;
export const MANAGER = 15;
export const DOCTOR = 16;
export const ASSISTANT = 33;
export const RECRPTIONIST = 34;

export const TOKEN = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).access_token : '';
export const ROLE = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).role_id : '';
export const SERVICE_ID = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).service_id : '';
export const USER_ID = sessionStorage.getItem('authentication') ? JSON.parse(sessionStorage.getItem('authentication')).id : '';
export const ISLOGIN = sessionStorage.getItem('authentication') ? true : false;
export const LANG = localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'en';
// Transition  
export const PAGETRANSITION = 'worksTransition';
export const LOGINTRANSITION = 'aboutTransition';
export const TRANSITIONSPEED = 300;

export const MSG_LOGIN = 'Error! Incorrect username/ password please try again.';


export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USER = 'FETCH_USER';
export const ADD_USERS = 'ADD_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';
export const DELETE_USERS = 'DELETE_USERS'; 
export const GET_USER = 'GET_USER';
export const GET_EDIT_USER = 'GET_EDIT_USER';
export const GET_PROFILE_USER = 'GET_PROFILE_USER';
export const SEARCH_USER = 'SEARCH_USER';
export const CONFIRM_DELETE_USERS = 'CONFIRM_DELETE_USERS';
export const ACT_DELETE_USERS = 'ACT_DELETE_USERS';
export const ERROR = "ERROR";
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export const FETCH_PRODUCTS = 'FETCH_PROODUCTS';
export const DELETE_PRODUCTS = 'DELETE_PROODUCTS';
export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';

export const FETCH_CUSTOMERS = 'FETCH_CUSTOMERS';
export const FETCH_CUSTOMER = 'FETCH_CUSTOMER';
export const UPDATE_CUSTOMERS = 'UPDATE_CUSTOMERS';
export const ADD_CUSTOMERS = 'ADD_CUSTOMERS';
export const DELETE_CUSTOMERS = 'DELETE_CUSTOMERS';
export const CONFIRM_DELETE_CUSTOMERS = 'CONFIRM_DELETE_CUSTOMERS';

export const FETCH_SMS = 'FETCH_SMS';
export const DELETE_SMS = 'DELETE_SMS';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const DELETE_ORDERS = 'DELETE_ORDERS';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';
export const ADD_ORDERS = 'ADD_ORDERS';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';

export const FETCH_SERVICE = 'FETCH_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';

export const FETCH_ROLE = 'FETCH_ROLE';
export const DELETE_ROLE = 'DELETE_ROLE';

export const FETCH_CALLING = 'FETCH_CALLING';
export const DELETE_CALLING = 'DELETE_CALLING';

export const FETCH_BILLING = 'FETCH_BILLING';
export const DELETE_BILLING = 'DELETE_BILLING';

export const ACCESS_TOKEN = 'access_token';

export const TOTAL_RECORD = 0;
export const LAST_PAGE = 0;
export const PAGE = 1;
export const PAGE_SIZE = 20;

export const AUTHENTICATION_401 = "401";

export const PAGINATION_CONFIG = {
    totalRecord: TOTAL_RECORD,
    pageSize: PAGE_SIZE,
    page: PAGE,
    startDate: moment().subtract(30, 'days').format("YYYY-MM-DD HH:mm:ss"),
    endDate: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss"),
    searchkey: '',
    sortColumn: '',
    sortType: 'desc',
    rdbutton: '',
    chbox1: true,
    chbox2: false,
    sltOption: '',
}

export const TITLE_PAGE = "TITLE_PAGE";
export const FETCH_RANKING = "FETCH_RANKING";
export const RECEPTION_AMOUNT = "RECEPTION_AMOUNT";
export const TRANSMISSION_AMOUNT = "TRANSMISSION_AMOUNT";
export const NUMBER_RECEPTION = "NUMBER_RECEPTION";
export const NUMBER_TRANSMISSION = "NUMBER_TRANSMISSION";
export const FETCH_CHARTS = "FETCH_CHARTS"; 
export const FETCH_CHART = "FETCH_CHART";
export const FETCH_DIAGRAM = "FETCH_DIAGRAM";