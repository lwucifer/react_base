import React, { Component } from 'react';
import Validator from 'react-forms-validator';
import { connect } from 'react-redux';
import { actLoginRequest } from './../actions/index';
class Login extends Component {
    constructor( props ){
        super( props );
        this.state = {
            email: "",
            password: "",
            isFormValidationErrors : true,
            submitted: false,
        };
        this.flag = true;
    }

    handleChange = (event) => {
        let { name, value } = event.target;
        this.setState( { [ name ]: value } );
    }
 
    isValidationError = (flag) => {
        this.setState({ isFormValidationErrors: flag });
    }
        
    handleFormSubmit = (event) => {
        event.preventDefault();
        this.setState( { submitted: true } );
        let { email, password, isFormValidationErrors } = this.state;
        let data = { email: email, password: password };
        if ( !isFormValidationErrors ){
            this.props.onLogin(data)
        }
    }
    
    render() {
        let { email, password, submitted } = this.state;
        let { t } = window.lang;
        return (
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-12 col-sm-12">
                <img src={ require('../../public/icon/login.png') } />
                    <p className="error-login">{this.props.message ? "無効なメールアドレスまたはパスワード": ""}</p>
                </div>
                <div className='clearfix'></div><br/><br/>
                <div className="wapper-login">
                    <form noValidate onSubmit={this.handleFormSubmit}>
                        <div className="form-group row col-sm-12 offset-md-0">
                            <label forhtml="staticEmail" className="col-sm-3 col-form-label">{t('login.Email')}</label>
                            <div className="col-sm-8">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control" placeholder={t('login.Email')}
                                    value={ email } 
                                    onChange={ this.handleChange }
                                />
                                <Validator 
                                    isValidationError= { this.isValidationError }
                                    isFormSubmitted= { submitted} 
                                    reference= {{ email: email }}
                                    validationRules= {{ required: true, email: true, maxLength: 50 }} 
                                    validationMessages= {{ required: "このフィールドが必要です。", maxLength: "最大長のメールアドレス", email: 'メールアドレスが正しくない' }}
                                />
                            </div>
                        </div>
                        <div className="form-group row col-sm-12 offset-md-0">
                            <label forhtml="inputPassword" className="col-sm-3 col-form-label">{t('login.Password')}</label>
                            <div className="col-sm-8">
                                <input 
                                    type="password" 
                                    name="password" 
                                    className="form-control" placeholder={t('login.Password')}
                                    value= { password } 
                                    onChange= { this.handleChange } 
                                />
                                <Validator 
                                    isValidationError= { this.isValidationError }
                                    isFormSubmitted= { submitted } 
                                    reference= {{ password: password }} 
                                    validationRules= {{ required: true }} 
                                    validationMessages= {{ required: "このフィールドが必要です。" }}
                                />
                            </div>

                            <div className="form-group row col-sm-7 offset-md-2 btn-login">
                                <button type="submit" className="btn btn-primary col-sm-6">{t('login.submit')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.authentication.loggedIn,
        message: state.authentication.message
    }
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		onLogin : (data) => {
			dispatch(actLoginRequest(data));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)( Login );