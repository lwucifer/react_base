import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddUserRequest, getProfileUser, setTitlePage} from '../../../actions/index';
import SimpleReactValidator from 'simple-react-validator';
class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            division_name: '',
            email: ''
        }
        this.validator = new SimpleReactValidator({
            element: message => <p className="error">{message}</p>,
            messages: {
                required: window.lang.t('validator.required', { attribute: ':attribute' }),
                alpha: 'The :attribute may only contain letters.',
                min: 'The :attribute must be at least 6 characters.'
            }
        });
        document.title = "ユーザ登録"
    }

    componentWillMount(){
        this.props.setTitle('ユーザ登録');
        this.props.getProfile();
    }

    componentWillReceiveProps(nextprops){
        if(nextprops.is_add){
            this.setState({ is_add: nextprops.is_add })
        }
	}

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
    }
    
    handleAdd = () => {
        if (this.validator.allValid()) {
            let params = {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                company_code: this.props.profile.company.code,
                division_name: this.state.division_name,
                username: this.state.name,
                email: this.state.email,
                created_by: this.props.profile.created_by.id,
                last_updated_by: this.props.profile.last_updated_by.id
            }
            this.props.onAddUser(params)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { t } = window.lang;
        if(!this.state.is_add){
            return (
                <div>
                    <form>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">{t('users.name')}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticName" onChange={this.onChangeForm} name="name" value={this.state.name} />
                                 <span style={styles.floatleft}>{this.validator.message('name', this.state.name, 'required|min:6')}</span>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">{t('users.divison_name')}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticdivision_name" onChange={this.onChangeForm} name="division_name" value={this.state.division_name} />
                                 <span style={styles.floatleft}>{this.validator.message('division_name', this.state.division_name, 'required|min:6')}</span>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">{t('users.email')}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticemail" onChange={this.onChangeForm} name="email" value={this.state.email} />
                                 <span style={styles.floatleft}>{this.validator.message('email', this.state.email, 'required|min:6|email')}</span>
                                 <span style={styles.floatleft}><p className="error">{(this.props.message && this.props.message === "The_email_has_already_been_taken" ? t("users.The_email_has_already_been_taken") : "")}</p></span>
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        <div className="col-sm-6">
                            <button style={styles.right10} type="button" className="buttonWhite" onClick={this.handleAdd} >{t('users.submit')}</button>
                            <Link to="/user/"> <button className="buttonGray"> {t("users.cancel")} </button> </Link>
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
                            <p>{t('users.register_success')}</p>
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
                                    <td>{this.state.name}</td>
                                    <td>{this.state.division_name}</td>
                                    
                                    <td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to="/user/"> <button className="buttonWhite"> {t("users.return_to_user_list")} </button> </Link>
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
        is_add: (state.users.is_add) ? true :false,
        users: state.users.users,
        profile: state.users.profile,
        message: state.users.message
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
        onAddUser : (params) => {
            dispatch(actAddUserRequest(params));
        },
        getProfile: () => {
            dispatch(getProfileUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
