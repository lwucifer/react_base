import React from 'react';
// Ranking
import Ranking from '../components/Ranking';
import ReceptionAmount from '../components/Ranking/ReceptionAmount';
import NumberReceptions from '../components/Ranking/NumberReceptions';
import Price from '../components/Ranking/Price';
import TransmissionAmount from '../components/Ranking/TransmissionAmount';
import NumberTransmissions from '../components/Ranking/NumberTransmissions';
// Chart
import Chart from '../components/Chart/';
import Diagram from '../components/Chart/Diagram';
// User
import User from '../components/User';
import Registration from '../components/User/Registration';
import ConfirmDelete from '../components/User/Delete';
import Edit from '../components/User/Edit';
// import Add from '../components/Example/add';
// import List from '../components/Example/list';
import HomePage2 from '../components/Example/index2';
import Validate from '../components/Example/validate';
import Modal from '../components/Example/modal';
import Hook from '../components/Example/hooks';
// import UsersPage from './pages/Users/UsersPage';

// 403
import Forbidden from './../components/Element/Forbidden';

const routes = [
	{
		path: '/',
		exact: true, // required
		// main: () => <Ranking lng={localStorage.getItem('i18nextLng')}/>
		main: ({match, location, history}) => <ReceptionAmount match={match} history={history} location={location} lng={localStorage.getItem('i18nextLng')}/>
	},
	{
		path: '/ranking',
		exact: true, // required
		main: ({match, location, history}) => <ReceptionAmount match={match} history={history} location={location} lng={localStorage.getItem('i18nextLng')}/>
	},
	{
		path: '/ranking/reception-amount',
		exact: false, // required
		main: ({match, location, history}) => <ReceptionAmount match={match} history={history} location={location}/>
	},
	{
		path: '/ranking/number-receptions',
		exact: false, // required
		main: ({match, location, history}) => <NumberReceptions match={match} history={history} location={location}/>
	},
	{
		path: '/ranking/price',
		exact: false, // required
		main: ({match, location, history}) => <Price match={match} history={history} location={location}/>
	},
	{
		path: '/ranking/transmission-amount',
		exact: false, // required
		main: ({match, location, history}) => <TransmissionAmount match={match} history={history} location={location}/>
	},
	{
		path: '/ranking/number-transmissions',
		exact: false, // required
		main: ({match, location, history}) => <NumberTransmissions match={match} history={history} location={location}/>
	},
	{
		path: '/chart',
		exact: true,
		main: ({match, location, history}) => <Chart match={match} history={history} location={location}/>
	},
	{
		path: '/chart/diagram',
		exact: false,
		main: ({match, location, history}) => <Diagram match={match} history={history} location={location}/>
	},
	{
		path: '/user/',
		exact: true,
		main: ({match, location, history}) => <User match={match} history={history} location={location}/>
	},
	{
		path: '/user/registration',
		exact: false,
		main: ({match, location, history}) => <Registration match={match} history={history} location={location}/>
	},
	{
		path: '/user/edit/:id',
		exact: false,
		main: ({match, location, history}) => <Edit match={match} history={history} location={location}/>
	},
	{
		path: '/user/delete/',
		exact: false,
		main: ({match, location, history}) => <ConfirmDelete match={match} history={history} location={location}/>
	},
    {
		path: '/index2',
		exact: false, // required
		main: () => <HomePage2 lng={localStorage.getItem('i18nextLng')}/>
	},
	{
		path: '/validate',
		exact: false, // required
		main: () => <Validate lng={localStorage.getItem('i18nextLng')}/>
	},
	{
		path: '/modal',
		exact: false, // required
		main: () => <Modal lng={localStorage.getItem('i18nextLng')}/>
	},
	{
		path: '/hooks',
		exact: false, // required
		main: () => <Hook lng={localStorage.getItem('i18nextLng')}/>
	},
	{
		path: '/403',
		exact: false,
		main: ({match}) => <Forbidden match={match}/>
	},
	// Users
	// {
	// 	path: '/users',
	// 	exact: true, // required
	// 	main: ({match, location, history}) => <UsersPage match={match} location={location} history={history}/>
	// },
];

export default routes;