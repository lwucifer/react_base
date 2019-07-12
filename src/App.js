import React, { Component } from 'react';
import { withI18n } from "react-i18next";
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
// import file HashRouter
import './App.css';
import './webarch.css';
import { Routes } from './routes/PrivateRoute';
import Header from './components/Element/Header';
import Sidebar from './components/Element/Sidebar';
import history from './_helpers/history';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lng: localStorage.getItem('i18nextLng'),
		}
	}

	componentWillMount() {
		window.lang = this.props;
	}

	render() {
		return (
			<React.Fragment>
				<Router history={history}>
					<div className="App">
						<Header changeLang={(lng) => { this.setState({ lng: lng }) }} />
						<div className="page-container row-fluid">
							<Sidebar changeLang={(lng) => { this.setState({ lng: lng }) }} />
							<div className="page-content">
								<div className="container">
									<Routes />
								</div>
							</div>
						</div>
					</div>
				</Router>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		authentication: state.authentication,
	}
}

export default connect(mapStateToProps, null)(withI18n()(App));
