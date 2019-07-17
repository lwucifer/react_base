import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Config from '../../../constants/config'
import DatePicker from "react-datepicker";
import Modal from 'react-responsive-modal';
import "react-datepicker/dist/react-datepicker.css";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip ,Legend} from 'recharts';

// import {merge, isEmpty} from 'lodash';
// // import file
// import {actFetchCustomersRequest, confirmDelete} from '../../actions/index'
// // import Utils from '../../common/Utils';
// const DataTable = React.lazy(() => {
//     return new Promise(resolve => setTimeout(resolve, 100)).then(
//         () => import("../../common/DataTable")
//     );
// });

// const renderLoader = () => <p>Loading</p>;
const data = [
    {
      "name": "2019/06/04",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "2019/06/05",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "2019/06/06",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "2019/06/07",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "2019/06/08",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "2019/06/09",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "2019/06/10",
      "uv": 3490,
      "pv": 4300
    }
  ]
class Chart extends Component {
    constructor(props) {
		super(props);
		this.state = {
            pagination: Config.PAGINATION_CONFIG,
            rdbutton: '',
            chbox1: true,
            chbox2: false,
            sltOption: '',
            open: false,
            username: '期間',
            searchkey: ''
        };
        document.title = "Chart"
    }
    onOpenModal = () => {
        this.setState({ open: true });
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
    render() {
        return (
            <div>
                 <div className="col-sm-6 data-filter">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="title">トーケン</td>
                                    <td>
                                    <select 
                                        className="form-control col-md-3" 
                                        name="sltOption" 
                                        onChange={this.onChangeLimit}
                                    >
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title">トーケン</td>
                                    <td>
                                        
                                        <input type="text" name="username" value={this.state.username} onChange={this.onChangeForm} className="form-control col-sm-9 float-left" required="required" />
                                        
                                        <button type="submit" className="buttonWhite" onClick={this.onOpenModal}>Choose</button>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title">期間</td>
                                    <td>
                                        
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
                  
                        <button className="buttonWhite float-right" >再集計</button>
                        <br/><br/><br/>
                        <div className="Charts">
                            <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                       </div>
                        
                    </div>
                    <Modal open={this.state.open} closeOnEsc={false} onClose={this.onCloseModal} center>
                        <div style={styles.width400} >
                            <h2></h2>
                            <br/>
                            <div className="">
                                <select className="custom-select" name="sltOption" multiple>
                                    <option value="0">Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="1">One</option>
                                    <option value="21">Two</option>
                                    <option value="31">Three</option>
                                </select>
                                <br/> <br/>
                            </div>
                        </div>
                        <div className="footer">
                            <div className="input-group">
                                <input type="text" name="searchkey" value={this.state.searchkey} onChange={this.onChangeForm} id="input" className="form-control" style={styles.right10}/>
                                <button type="submit" className="buttonWhite">Submit</button>
                            </div>
                            <br/>
                            <div className="text-center">
                                <button className="buttonBlack" onClick={this.onCloseModal}>Close</button>
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
    }
}
export default Chart;
