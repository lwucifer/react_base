import React, { Component } from 'react';
import { connect } from 'react-redux';
import {findIndex} from 'lodash';
import * as Config from '../../../constants/config'
import DatePicker from "react-datepicker";
import Modal from 'react-responsive-modal';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,Legend} from 'recharts';
import moment from 'moment';
import {getCharts, getUserList,  setTitlePage} from '../../../actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const data = [
    {
      "date": "2019/06/04",
      "like": 4000,
      "thanks": 2400
    },
    {
      "date": "2019/06/05",
      "like": 3000,
      "thanks": 1398
    },
    {
      "date": "2019/06/06",
      "like": 2000,
      "thanks": 9800
    },
    {
      "date": "2019/06/07",
      "like": 2780,
      "thanks": 3908
    },
    {
      "date": "2019/06/08",
      "like": 1890,
      "thanks": 4800
    },
    {
      "date": "2019/06/09",
      "like": 2390,
      "thanks": 3800
    },
    {
      "date": "2019/06/10",
      "like": 3490,
      "thanks": 4300
    }
];
const users = [
    {'id': 1, "name": "チャート 1"},
    {'id': 2, "name": "チャート 2"},
    {'id': 3, "name": "チャート 3"},
    {'id': 4, "name": "チャート 4"},
    {'id': 5, "name": "チャート 5"},
    {'id': 6, "name": "チャート 6"},
    {'id': 7, "name": "チャート 7"},
    {'id': 8, "name": "チャート 8"},
    {'id': 9, "name": "チャート 9"},
    {'id': 10, "name": "チャート 10"},
    {'id': 12, "name": "チャート 12"},
    {'id': 13, "name": "チャート 13"},
    {'id': 14, "name": "チャート 14"},
    {'id': 15, "name": "チャート 15"},
    {'id': 16, "name": "チャート 16"},
    {'id': 17, "name": "チャート 17"},
    {'id': 18, "name": "チャート 18"},
    {'id': 19, "name": "チャート 19"},
    {'id': 20, "name": "チャート 20"},
]
const users2 = [
    {'id': 10, "name": "チャート 10"},
    {'id': 12, "name": "チャート 12"},
    {'id': 13, "name": "チャート 13"},
    {'id': 14, "name": "チャート 14"},
    {'id': 15, "name": "チャート 15"},
    {'id': 16, "name": "チャート 16"},
    {'id': 17, "name": "チャート 17"},
    {'id': 18, "name": "チャート 18"},
    {'id': 19, "name": "チャート 19"},
    {'id': 20, "name": "チャート 20"},
]
const option = {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};
class Chart extends Component {
    constructor(props) {
		super(props);
		this.state = {
            pagination: Config.PAGINATION_CONFIG,
            rdbutton: '',
            searchkey: ' ',
            open: false,
            target: 'reception_amount',
            name: '',
            targetList: 1,
            value: '',
            UserSelected: '',
            dataUsers: [],
            show: false
        };
        document.title = "推移"
    }

    componentWillMount(){
        this.props.setTitle('推移');
        this.loadData();
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.users){
            this.setState({
                dataUsers: nextProps.users
            })
        }
    }

    loadData = () => {
        let params = {
            type: this.state.targetList,
            startDate: moment(this.state.pagination.startDate).format("YYYY-MM-DD"),
            endDate: moment(this.state.pagination.endDate).format("YYYY-MM-DD"),
            user: this.state.value ? this.state.value : 1
        };
        if(moment(params.startDate).diff(params.endDate, 'minutes') > 1){
            var {t} = window.lang;
            toast.error( t("charts.start_date_is_greater_than_end_date"), option);
            this.setState({ 
                show: false
            });
        } else {
            this.props.getCharts(params);
        }
    }

    onOpenModal = () => {
        this.props.getUserList({name: ' '});
        this.setState({ 
            open: true
        });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
        var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
            [name]: value
		});
    }

    handleSearch = () => {
        if(this.state.value){
            this.setState({
                show: true
            })
            this.loadData();
        } else {
            var {t} = window.lang;
            toast.error( t("charts.users_empty"), option);
        }
       
    }

    handleChangeStartDate = (date) => {
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                startDate: date
            }
        }));
    }

    handleChangeEndDate = (date) => {
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                endDate: date
            }
        }));
    }

    handleSearchFormUser = () => {
        this.props.getUserList({name: this.state.searchkey});
    }

    getUserName = () => {
        var index = findIndex(this.state.dataUsers, { id: parseInt(this.state.value)});
        if( index !== -1 ){
            return this.state.dataUsers[index].name;
        }
    }

    render() {
        var {t} = window.lang;
        return (
            <div>
                <ToastContainer />
                 <div className="col-sm-7 data-filter">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="title"> {t("charts.target")} </td>
                                    <td className="title-third">
                                    <select 
                                        className="form-control col-md-5" 
                                        name="targetList" 
                                        onChange={this.onChangeForm}
                                    >
                                        <option value="1">{t("menu.reception_amount")}</option>
                                        <option value="2">{t("menu.number_receptions")}</option>
                                        <option value="3">{t("menu.price")}</option>
                                        <option value="4">{t("menu.transmission_amount")}</option>
                                        <option value="5">{t("menu.number_transmissions")}</option>
                                    </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title"> {t("charts.name")} </td>
                                    <td className="title-third">
                                        <input type="text" name="username" value={this.getUserName()} onChange={this.onChangeForm} className="form-control col-sm-9 float-left" disabled />
                                        <button type="submit" className="buttonWhite"   style={styles.left10}  onClick={this.onOpenModal}>{t("charts.choose")}</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title">{t('charts.time')}</td>
                                    <td className="title-third">
                                        <DatePicker
                                            selected={new Date( this.state.pagination.startDate )}
                                            onChange={this.handleChangeStartDate}
                                            dateFormat="yyyy-MM-dd"
                                            className="form-control"
                                            showMonthDropdown
                                            placeholderText="I have been cleared!"
                                        />
                                        <span className="slash">-</span>
                                        <DatePicker
                                            selected={new Date( this.state.pagination.endDate )}
                                            onChange={this.handleChangeEndDate}
                                            dateFormat="yyyy-MM-dd"
                                            className="form-control"
                                            showMonthDropdown
                                            placeholderText="I have been cleared!"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                  
                        <button className="buttonWhite float-right" onClick={this.handleSearch}>{t("charts.create_chart")}</button>
                        <br/><br/>
                        {this.state.show &&
                           <div className="Charts">
                                <LineChart width={730} height={250} data={this.props.charts.ranks} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="thanks" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="like" stroke="#82ca9d" />
                                </LineChart>
                            </div>
                        }
                        
                        
                    </div>
                    <Modal open={this.state.open} closeOnEsc={false} onClose={this.onCloseModal} center>
                        <div style={styles.width400} >
                            <br/>  <br/>
                            <div className="wapper">
                                <select className="custom-select" style={styles.minHeight} onChange={this.onChangeForm} name="value" multiple>
                                    {this.state.dataUsers && this.state.dataUsers.length > 0 && this.state.dataUsers.map( (item, key) => {
                                        return (
                                            <option key={key} value={item.id} >{item.name}</option>
                                        )
                                    })}
                                </select>
                                <br/> <br/>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="input-group">
                                <input type="text" name="searchkey" onChange={this.onChangeForm} id="input" className="form-control" style={styles.right10}/>
                                <button type="submit" className="buttonWhite" onClick={this.handleSearchFormUser}>検索</button>
                            </div>
                            <br/>
                            <div className="text-center">
                                <button className="buttonBlack" onClick={this.onCloseModal}>確定</button>
                            </div>
                        </div>
                    </Modal>   
            </div>
        );
    }
}
var styles = {
    width400: {
        width: 300
    },
    right10: {
        marginRight: 10
    },
    left10: {
        marginLeft: 10
    },
    minHeight: {
        minHeight: 200
    },
}
const mapStateToProps = (state) => {
    return {
        charts: state.chart.charts ? state.chart.charts : [],
        users: state.chart.search ? state.chart.search.list : [],
    };
}
const mapDispatchToProps = (dispatch, props) => {
	return {
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
        getCharts: (params) => {
            dispatch(getCharts(params));
        },
        getUserList: (params) => {
            dispatch( getUserList(params) );
        }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Chart);
