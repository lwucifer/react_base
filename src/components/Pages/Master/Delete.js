import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {isEmpty} from 'lodash';
import  history from '../../../_helpers/history';
import {actDeleteUserRequest, setTitlePage} from '../../../actions/index';
class confirmDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ids: []
        }
        document.title = "ユーザ削除"
    }
    componentWillMount(){
        this.props.setTitle('ユーザ削除');
    }
    handleDelete = () => {
        let params = {
            ids: { ...this.props.ids }
        }
        this.props.actDeleteUserRequest(params);
    }
    
    render() {
       
        let {t} = window.lang;
        if(!this.props.is_delete){
            if(isEmpty(this.props.ids)){
                history.push('/master')
            }
            return (
                <div className="col-sm-8">
                    <div className="panel panel-default table-responsive">
                        <div className="panel-heading"></div>
                        <div className="panel-body">
                            <p>{t("users.delete_text")}</p>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">{t('users.name')}</th>
                                    <th className="text-center">{t('users.divison_name')}</th>
                                    <th className="text-center">{t('users.email')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.users && this.props.users.map( (item, key) => {
                                    return (
                                        <tr key = {key} >
                                            <td>{item.username}</td>
                                            <td>{item.division_name}</td>
                                            <td>{ item.email }</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <button style={styles.right10} type="button" className="btn btn-dark" onClick={this.handleDelete} >{t("users.button_delete")}</button>
                        <Link to={"/mas/edit/" + this.props.ids[0]} className="btn">{t("users.delete_cancel")}</Link>
                    </div>
                </div>
            );
            
        } else {
            return (
                <div className="col-sm-8">
                    <div className="panel panel-default table-responsive">
                        <div className="panel-heading"> </div>
                        <div className="panel-body">
                            <p>{t("users.the_user_has_been_deleted")}</p>
                        </div>
                        <Link to={"/master"} className="btn">{t("users.return_to_user_list")}</Link>
                    </div>
                </div>
            )
        }
        
    }
}

var styles = {
    right10: {
        marginRight: 10
    }
}
const mapStateToProps = state => {
    return {
        ids: state.users.ids ? state.users.ids : [],
        users: state.users.user ? state.users.user : [],
        is_delete: state.users.is_delete
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
        getDeleteUser : (params) => {
			dispatch((params));
        },
        actDeleteUserRequest: (params) => {
            dispatch(actDeleteUserRequest(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(confirmDelete);
