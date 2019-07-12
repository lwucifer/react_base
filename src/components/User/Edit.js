import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actEditUserRequest, actGetEditUserData, setTitlePage} from '../../actions/index';
import SimpleReactValidator from 'simple-react-validator';
import {isEmpty, findIndex} from 'lodash';
class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            division_name: '',
            email: '',
            is_edit: false
        }
        this.validator = new SimpleReactValidator({
            element: message => <p className="error">{message}</p>,
            messages: {
                required: window.lang.t('validator.required', { attribute: ':attribute' }),
                alpha: 'The :attribute may only contain letters.',
                min: 'The :attribute must be at least 6 characters.'
            }
        });
        document.title = "ユーザ修正"
    }

    componentWillMount(){
        this.props.setTitle('ユーザ修正');
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            var id = this.props.match.params.id;
            if(this.props.users && this.props.users.list){
                let index = findIndex(this.props.users.list, { id: parseInt(id) });
                if(index !== -1){
                    let data = this.props.users.list[index];
                    this.setStateUser(data);
                }
            } else {
                this.props.getEditData(id);
            }
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops.is_edit){
            this.setState({ is_edit: nextprops.is_edit })
        }
        if(!isEmpty(nextprops.user) && nextprops.user){
           this.setStateUser(nextprops.user);
        }
    }
    
    setStateUser = (data) => {
        this.setState({
            id: data.id,
            username: data.username ? data.username : "",
            division_name: data.division_name ? data.division_name : "",
            email: data.email
        });
    }

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
    }
    
    handleEdit = () => {
        if (this.validator.allValid()) {
            let params = {
                token: localStorage.getItem('access_token'),
                id: this.state.id,
                username: this.state.username,
                division_name: this.state.division_name,
                email: this.state.email
            }
            this.props.onEditUser(params)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        let {t} = window.lang;
        if(!this.state.is_edit){
            return (
                <div>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">{t('users.name')}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticName" onChange={this.onChangeForm} name="username" value={this.state.username} />
                                <span style={styles.floatleft}>{this.validator.message('name', this.state.username, 'required|min:6')}</span>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">{t('users.divison_name')}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticDivisonName" onChange={this.onChangeForm} name="division_name" value={this.state.division_name} />
                                <span style={styles.floatleft}>{this.validator.message('division_name', this.state.division_name, 'required|min:6')}</span>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">{t('users.email')}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticEMail" onChange={this.onChangeForm} name="email" value={this.state.email} />
                                <span style={styles.floatleft}>{this.validator.message('email', this.state.email, 'required|min:6|email')}
                                {this.props.message && this.props.message.email ? t("users.The_email_has_already_been_taken") : ''}
                                
                                </span>
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        <div className="col-sm-6">
                            <button style={styles.right10} type="button" className="buttonWhite" onClick={this.handleEdit} >確定</button>
                            <Link  to="/user/"> <button className="buttonGray">キャンセル</button> </Link>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="col-sm-8">
                    <div className="panel panel-default table-responsive">
                        <div className="panel-heading"></div>
                        <div className="panel-body">
                            <p>{t('users.edit_success')}</p>
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
                                <tr>
                                    <td>{this.props.users.username}</td>
                                    <td>{this.props.users.email}</td>
                                    <td>{this.props.users.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to="/user/"> <button className="buttonWhite">ユーザ一覧へ戻る</button></Link>
                    </div>
                </div>
            )
        }    
    }
}
var styles = {
    right10: {
        marginRight: 10
    },
    floatleft:{
        float: "left"
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        users: state.users.users,
        is_edit: (state.users.is_edit) ? true :false,
        message: state.users.message
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
        onEditUser : (params) => {
            dispatch(actEditUserRequest(params));
        },
        getEditData: (id) => {
            dispatch(actGetEditUserData(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(edit);