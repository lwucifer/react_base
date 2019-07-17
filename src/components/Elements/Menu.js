import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
const menu = [
	{
		name: 'menu.ranking',
		to: '/ranking',
		exact: false,
		icon: require('../../../public/icon/trophy.png'),
        children: [
			{
				name: 'menu.reception_amount',
				to: '/ranking/reception-amount',
				exact: false,
				icon: 'card_giftcard',
			},
			{
				name: 'menu.number_receptions',
				to: '/ranking/number-receptions',
				exact: false,
				icon: 'card_giftcard',
			},
			{
				name: 'menu.price',
				to: '/ranking/price',
				exact: false,
				icon: 'card_giftcard',
			},
			{
				name: 'menu.transmission_amount',
				to: '/ranking/transmission-amount',
				exact: false,
				icon: 'card_giftcard',
			},
			{
				name: 'menu.number_transmissions',
				to: '/ranking/number-transmissions',
				exact: false,
				icon: 'card_giftcard',
			}
		]
	},

	{
		name: 'menu.charts',
		to: '/chart/',
		exact: false,
        icon: require('../../../public/icon/chart.png'),
        children: [
			{
				name: 'menu.chart',
				to: '/chart/',
				exact: false,
				icon: 'card_giftcard',
			},
			{
				name: 'menu.diagram',
				to: '/chart/diagram',
				exact: false,
				icon: 'card_giftcard',
			}
		]
	},
	{
		name: 'menu.user',
		to: '/user/',
		exact: false,
        icon: require('../../../public/icon/man.png'),
        children: [
			{
				name: 'menu.list',
				to: '/user/',
				exact: false,
				icon: 'card_giftcard',
			},
			{
				name: 'menu.registration',
				to: '/user/registration',
				exact: false,
				icon: 'card_giftcard',
			}
		]
	},
	{
		name: 'menu.luu',
		to: '/luu/',
		exact: false,
        icon: require('../../../public/icon/man.png'),
        children: [
			{
				name: 'menu.list',
				to: '/luu/',
				exact: false,
				icon: 'card_giftcard',
			}
		]
	}
	// {
	// 	name: 'Validate',
	// 	to: '/validate',
	// 	exact: false,
	// 	icon: 'supervisor_account'
	// },
	// {
	// 	name: 'modal',
	// 	to: '/modal',
	// 	exact: false,
	// 	icon: 'supervisor_account'
	// },
	// {
	// 	name: 'Hook',
	// 	to: '/hooks',
	// 	exact: false,
	// 	icon: 'account_circle'
	// },
	// {
	// 	name: 'Users',
	// 	to: '/users',
	// 	exact: false,
	// 	icon: 'account_circle'
	// },
];
class MenuLink extends React.Component {
	constructor(props) {
        super(props);
        this.state = { 
            activeIndex: 0
		};
		this.toggleClass= this.toggleClass.bind(this);

	}
	toggleClass(index, e) {
		this.setState({ activeIndex: index });
	};
	
	render() {
		const { t } = window.lang;
        return (
            <Route
				path={this.props.to}
				exact={this.props.exact}
				children={({ match }) => {
					var active = (match && match !== null) ? "active" : "";
					var subClass = (this.props.children) ? "firstMenu":"";
					return (
						<li className={`nav-item ${active}`}>
							<Link to={this.props.to} className={`nav-link ${subClass}`}>
								<img src={ this.props.icon } className="menuIcon" />
								<span className="title">{t(this.props.label)}</span> <span className="selected"></span> 
								{ this.props.children &&
									<span className="arrow open"></span> 
								}
							</Link>
							{this.props.children &&
								<ul className="sub-menu">
									{this.props.children.map((item, i) => (
										<li className="subMenu" key={i}> 
											<Link to={item.to} className="nav-link">
												{t(item.name)}
											</Link>	
										</li>
									))}   
								</ul>
							}
						</li>
					)
				}}
			/>
        );
    }
}

class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = ({
		});
		this.showMenu = this.showMenu.bind(this);
	}

	showMenu() {
		var result = null;
        if (menu.length > 0) {
            result = menu.map((m, index) => {
				return <MenuLink label={m.name} to={m.to} exact={m.exact} key={index} item={index} icon={m.icon} children={m.children}/>
            });
        }
		return result;
	}

	onLogout() {
        this.props.onActLogout();
    }

	render() {
		return (
			<React.Fragment>
				{this.showMenu(menu)}	
			</React.Fragment>
		);
	}
}

// const mapStateToProps = state => {
// 	return {
// 		authentication: state.authentication,
// 	}
// }


export default connect(null, null)( Menu );
