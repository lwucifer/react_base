import React, { Component } from 'react';
import {connect} from 'react-redux';
import i18n from '../../i18n';
class Header extends Component {
    switchLang(lng){
        localStorage.setItem('i18nextLng', lng);
        i18n.changeLanguage(lng)
        this.props.changeLang(lng);
        // location.reload();
    }

    Logout = () => {
        this.props.onLogout();
    }
    render() {
        return (
           <div>
                { (this.props.authentication && this.props.authentication.loggedIn) && 
                <div className="header navbar navbar-inverse ">
                    <div className="navbar-inner">
                        <div className="header-seperation">
                            <a href="index.html">
                            <img src={ require('../../../public/icon/logo5.png') } className="logo-gugu" />
                            </a>
                        </div>
                        <div className="header-quick-nav">
                            <div className="pull-left">
                                <ul className="nav quick-section">
                                    <li className="quicklinks">
                                        <span style={styles.textFont}> {this.props.title} </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="pull-right">
                                
                                <ul className="nav quick-section ">
                                    <li className="quicklinks open">
                                        <a data-toggle="dropdown" className="dropdown-toggle  pull-right " href="index.html" id="user-options" aria-expanded="true">
                                            <span>{localStorage.getItem('i18nextLng')}</span>
                                        </a>
                                        <ul className="dropdown-menu  pull-right" role="menu" aria-labelledby="user-options">
                                            <li>
                                                <span className="dropdown-item" onClick={() => this.switchLang('en')}>EN</span>
                                            </li>
                                            <li>
                                                <span className="dropdown-item" onClick={this.switchLang.bind(this,'jp')}>JP</span>
                                            </li>
                                            
                                        </ul>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                }
           </div>
        );
    }
}
var styles = {
    textFont: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 2
    }
}
const mapStateToProps = state => {
	return {
        authentication: state.authentication,
        title: state.config.title
	}
}

export default connect(mapStateToProps, null)( Header );