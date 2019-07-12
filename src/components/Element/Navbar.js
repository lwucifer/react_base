import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import i18n from './../../i18n';
import Menu from './Menu';
import {actLogoutRequest} from './../../actions/index';
class Navbar extends Component {
    switchLang(lng){
        localStorage.setItem('i18nextLng', lng);
        i18n.changeLanguage(lng)
        this.props.changeLang(lng);
    }

    Logout = () => {
        this.props.onLogout();
    }
 
    render() {
        return (
            <div>
                { (this.props.authentication && this.props.authentication.loggedIn) && 
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
               
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <Menu/>
                        </ul>
                        <ul className="navbar-nav navbar-nav-login mt-2 mt-lg-0">
                            <li className="nav-item dropdown">
                                <span className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {localStorage.getItem('i18nextLng')}
                                </span>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <span className="dropdown-item" onClick={() => this.switchLang('en')}>EN</span>
                                    <span className="dropdown-item" onClick={this.switchLang.bind(this,'es')}>ES</span>
                                </div>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={this.Logout}>Logout</span>
                            </li>
                        </ul>
                    </div>
                </nav>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
	return {
		authentication: state.authentication,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onLogout : () => {
			dispatch(actLogoutRequest());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)( Navbar );