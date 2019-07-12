import * as Types from '../constants/config';
import rf from './../lib/RequestFactory';
import  history from '../_helpers/history';

export const setTitlePage = (title) => {
    return (dispatch) => {
        dispatch({
            type: Types.TITLE_PAGE,
            title
        });
    }
}
// Ranking
export const FetchRanking = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getRanking(params).then(res => {
            dispatch({
                type: Types.FETCH_RANKING,
                res
            });
        })
    }
}
export const FetchReceptionsAmount = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getReceptionsAmount(params).then(res => {
            dispatch({
                type: Types.RECEPTION_AMOUNT,
                res
            });
        })
    }
}

export const FetchNumberReceptions = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getNumberReceptions(params).then(res => {
            dispatch({
                type: Types.NUMBER_RECEPTION,
                res
            });
        })
    }
}

export const FetchNumberTransmissions = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getNumberTransmissions(params).then(res => {
            dispatch({
                type: Types.NUMBER_TRANSMISSION,
                res
            });
        })
    }
}

export const FetchTransmissionAmount = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getTransmissionsAmount(params).then(res => {
            dispatch({
                type: Types.TRANSMISSION_AMOUNT,
                res
            });
        })
    }
}

// Charts
export const getCharts = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getCharts(params).then(res => {
            let data = res.response.data;
            let status = res.response.status;
            dispatch({
                type: Types.FETCH_CHARTS,
                data,
                status
            })
        });
    }
}

export const getUserList = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getUserList(params).then(res => {
            dispatch({
                type: Types.SEARCH_USER,
                res
            })
        });
    }
}

export const DiagramData = (type, date) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').DiagramDataRequest(type, date).then(res => {
            let data = res.response.data;
            dispatch({
                type: Types.FETCH_DIAGRAM,
                data
            })
        });
    }
}

export const actFetchCustomersRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getCustomers(params).then(res => {
            dispatch({
                type: Types.FETCH_CUSTOMERS,
                res
            });
        })
    }
}

export const actFetchCustomerRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getCustomer(params).then(res => {
            dispatch({
                type: Types.FETCH_CUSTOMER,
                res
            });
        })
    }
}

export const actEditCustomerRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').editCustomer(params.id, params).then(res => {
            if(res.status){
                dispatch({
                    type: Types.FETCH_CUSTOMER,
                    is_edit: res.status,
                    res
                });
            }
        })
    }
}
export const actAddCustomerRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').addCustomer( params ).then(res => {
            if(res.status){
                dispatch({
                    type: Types.ADD_CUSTOMERS,
                    is_add: res.status,
                    res
                });
            }
        })
    }
}

export const confirmDelete = (params) => {
    return (dispatch) => {
        dispatch({
            type: Types.CONFIRM_DELETE_CUSTOMERS,
            params
        });
        history.push('/customer/delete') 
    }
}

export const actFetchDeleteCustomerRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getDeleteCustomer(params).then(res => {
            if(res.status){
                dispatch({
                    type: Types.FETCH_CUSTOMER,
                    res
                });
            }
        })
    }
}

export const actDeleteCustomerRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').deleteCustomer(params).then(res => {
            if(res.status){
                dispatch({
                    type: Types.DELETE_CUSTOMERS,
                    res
                });
            }
        })
    }
}
// Users
export const actFetchUsersRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getUsers(params).then(res => {
            dispatch({
                type: Types.FETCH_USERS,
                res
            });
        })
    }
}

export const actAddUserRequest = (params) => {    
    return (dispatch) => {
        rf.getRequest('AdminRequest').addUser( params ).then(res => {
            if(res.response.status){
                dispatch({
                    type: Types.ADD_USERS,
                    is_add: res.response.status.code === 201 ? true : false,
                    params,
                    res
                });
            }
        })
    }
}
export const actGetEditUserData = (id) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getEditUserData( id ).then(res => {
            if(res.response.status.code === 200){
                let data = res.response.data;
                dispatch({
                    type: Types.GET_EDIT_USER,
                    data
                });
            }
        })
    }
}
export const actEditUserRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').editUser(params.id, params).then(res => {
            dispatch({
                type: Types.FETCH_USER,
                is_edit: res.response.status.message === "success" ? true : false ,
                res
            });
        })
    }
}

export const confirmUserDelete = (params) => {
    return (dispatch) => {
        dispatch({
            type: Types.CONFIRM_DELETE_USERS,
            params
        });
        history.push('/user/delete') 
    }
}

export const actDeleteUserRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').deleteUsers(params).then(res => {
            var status = true;
            dispatch({
                type: Types.ACT_DELETE_USERS,
                status
            });
        })
    }
}
export const actLoginRequest = (params) => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').login(params).then(res => {
            var response = res.response;
            if(response.status.code && response.status.code === 201){
                dispatch({
                    type: Types.LOGIN,
                    response
                });
                history.push('/') 
            } else {
                dispatch({
                    type: Types.LOGIN_FAILED,
                    response
                });
            }
        })
    }
}

export const actLogoutRequest = () => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').logout().then(res => {
            if(res === Types.AUTHENTICATION_401 || res.response && res.response.status.message === 'success'){
                var response = res.response;
                dispatch({
                    type: Types.LOGOUT,
                    response
                });
            }
        })
    }
}

export const getProfileUser = () => {
    return (dispatch) => {
        rf.getRequest('AdminRequest').getProfileUser().then(res => {
            if(res.response.status.code === 200){
                var response = res.response;
                dispatch({
                    type: Types.GET_PROFILE_USER,
                    response
                });
            }
        })
    }
}