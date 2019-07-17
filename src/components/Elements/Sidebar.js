import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import {actLogoutRequest} from './../../actions/index';
class Sidebar extends Component {
    Logout = () => {
        this.props.onLogout();
    }
    render() {
        var {t} = window.lang;
        return (
           <div>
                { (this.props.authentication && this.props.authentication.loggedIn) && 
                    <div className="page-sidebar" id="main-menu">
                        <div className="page-sidebar-wrapper scrollbar-dynamic" id="main-menu-wrapper">
                            <ul>
                                <Menu />
                                <li className="nav-item">
                                    <Link to="/" className="nav-link" onClick={this.Logout}>
                                        <img src={ require('../../../public/icon/door.png') } className="menuIcon" />  
                                        <span className="title">{t('menu.logout')}</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)( Sidebar );
