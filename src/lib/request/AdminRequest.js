import BaseRequest from './../BaseRequest'
import {URL} from './../../constants/config';

export default class AdminRequest extends BaseRequest {

    getCustomers(params) {
        let url = URL + '/api/ranking';
        return this.get(url, params);
    }

    getUsers(params) {
        let url = URL + '/api/manager/list';
        return this.get(url, params);
    }

    addUser(params) {
        let url = URL + '/api/manager/create';
        return this.post(url, params)
    }

    getEditUserData(id) {
        let url = URL + '/api/manager/user/' + id;
        return this.get(url)
    }

    editUser(id, params) {
        let url = URL + '/api/manager/update';
        return this.put(url, params)
    }

    deleteUsers(params) {
        let url = URL + '/api/manager/delete';
        return this.del(url, params);
    }

    getCustomer(id) {
        let url = URL + '/auth/customer/' + id;
        return this.get(url);
    }

    addCustomer(params) {
        let url = URL + '/auth/customer';
        return this.post(url, params)
    }

    editCustomer(id, params) {
        let url = URL + '/auth/customer/' + id;
        return this.put(url, params)
    }

    getDeleteCustomer(params) {
        let url = URL + '/auth/customer-get';
        return this.get(url, params);
    }

    deleteCustomer(params) {
        let url = URL + '/auth/customer';
        return this.del(url, params)
    }

    login(params) {
        let url = URL + '/auth/login';
        return this.post(url, params);
    }

    logout() {
        let url = URL + '/api/user/logout';
        return this.get(url);
    }

    getRanking(params) {
        let url = URL + '/api/ranking';
        return this.get(url, params);
    }

    getCharts(params) {
        let url = URL + '/api/ranking/chart';
        return this.get(url, params);
    }

    getUserList(params) {
        let url = URL + '/api/manager/user/search';
        return this.get(url, params);
    }

    DiagramDataRequest(type, date) {
        let url = URL + '/api/transaction/day?day=' + date + '&type=' + type;
        return this.get(url);
    }

    getReceptionsAmount(params) {
        let url = URL + '/api/filter/ranking/receipt';
        return this.get(url, params);
    }

    getTransmissionsAmount(params) {
        let url = URL + '/api/filter/ranking/send';
        return this.get(url, params);
    }

    getNumberReceptions(params) {
        let url = URL + '/api/filter/ranking/receipt';
        return this.get(url, params);
    }

    getNumberTransmissions(params) {
        let url = URL + '/api/filter/ranking/send';
        return this.get(url, params);
    }

    getProfileUser() {
        let url = URL + '/api/user/profile';
        return this.get(url);
    }
}
