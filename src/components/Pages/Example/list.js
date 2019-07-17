import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Config from '../../../constants/config'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {merge, isEmpty} from 'lodash';
// import file
import {actFetchCustomersRequest, confirmDelete} from '../../../actions'
// import Utils from '../../common/Utils';
const DataTable = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 100)).then(
        () => import("../../common/DataTable")
    );
});

const renderLoader = () => <p>Loading</p>;
class index extends Component {
    constructor(props) {
		super(props);
		this.state = {
            pagination: Config.PAGINATION_CONFIG,
            rdbutton: '',
            chbox1: true,
            chbox2: false,
            sltOption: '',
            titles: {
                id: {
                    name: 'Emotion',
                    sortBy: "customers.emotion",
                    class: "c1"
                },
                name: {
                    name: 'Name',
                    sortBy: "customers.name",
                    class: "c3"
                },
                is_active: {
                    name: 'Gender',
                    sortBy: "customers.gender",
                    class: "c5"
                },
                created_at: {
                    name: 'Edit',
                    sortBy: "",
                    class: ""
                },
                created_at2: {
                    name: '',
                    sortBy: "",
                    class: "c7"
                }
            },
            checked: []
        };
        document.title = "Home Page"
    }
    
    componentWillMount(){
        if(isEmpty( this.props.customers )){
            this.getCustomersData();
        }
    }

    componentWillReceiveProps(nextProps){
       if(nextProps.customers.total){
            this.setState({
                page: nextProps.customers.current_page,
                totalRecord: nextProps.customers.total
            });
       }
    }

    onChangePage = (info, type) => {
        if(type && type === 'changePage'){
            this.setState(prevState => ({
                pagination: {
                    ...prevState.pagination,
                    page: info.currentPage
                }
            }), () => {
                this.getCustomersData();
            })
        }
    }

    onSort = (column, type) => {
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                sortColumn: column, 
                sortType: type 
            }
        }), () => {
            this.getCustomersData();
        })
    }

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
        var value = target.type === 'checkbox'? target.checked:target.value;
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                [name]: value
            }
        }));
    }

    onChangeLimit = (event) => {
        var target = event.target;
        var value = target.type === 'checkbox'? target.checked:target.value;
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                pageSize: value
            }
        }), () => {
            this.getCustomersData();
        })
    }

    onChangeChbox = (event) => {
        var array = this.state.checked;
        if(event.target.checked){
            if (array.indexOf(event.target.value) === -1) {
                array.push(event.target.value);
            }
        } else {
            var index = array.indexOf(event.target.value);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }
        this.setState({ checked: array });
    }

    handleDelete = () => {
        if(this.state.checked){
            this.props.confirmDelete(this.state.checked);
        }
    }

    render() {
        // const { t } = window.lang;
        let { customers} = this.props;
        return (

                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group row">
                            <div className="col-sm-1">
                                <select className="form-control"  name="sltOption" onChange={this.onChangeLimit}>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <label className="col-sm-2 col-form-label">件表示</label>
                            <div className="col-sm-7">
                            <button className="buttonWhite float-right" onClick={ this.handleDelete } >Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-10">
                        
                        <React.Suspense fallback={renderLoader()}>
                            <DataTable 
                                titles={this.state.titles}
                                sortColumn={this.state.pagination.sortColumn} 
                                sortType={this.state.pagination.sortType} 
                                totalRecord={ this.props.totalRecord }
                                pageSize={this.state.pagination.pageSize}
                                currentPage={this.state.pagination.page}
                                onSort={ this.onSort }
                                onChangePage={this.onChangePage}
                            >

                                {customers && customers.data && customers.data.map( (item, key) => {
                                    return (
                                        <tr key = {key} >
                                            <td>{item.emotion}</td>
                                            <td>{item.name}</td>
                                            <td>{ item.gender }</td>
                                            <td> <Link to={`/edit/${item.id}`} > <i className="material-icons">create</i> </Link> </td>
                                            <td> <input type="checkbox" value={item.id} onChange={this.onChangeChbox} /> </td>
                                        </tr>
                                    )
                                })}
                            </DataTable>
                        </React.Suspense>
                    </div>
                </div>
        );
    }
    getCustomersData = (meta = null) => {
        let params = {
            page: this.state.pagination.page,
            limit: this.state.pagination.pageSize,
            sortColumn: this.state.pagination.sortColumn,
            sortType: this.state.pagination.sortType,
            searchkey: this.state.pagination.searchkey
        };
        let data = merge(params, meta);
        console.log(data);
        this.props.getCustomer(data);
    }

    handleSearch = () => {
        let params = {
            sltOption: this.state.sltOption,
            rdbutton: this.state.rdbutton,
            chbox1: this.state.chbox1,
            chbox2: this.state.chbox2
        }
        
        this.getCustomersData(params);
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
}

const mapStateToProps = (state) => {
	return {
        customers: state.customers.customers,
        totalRecord: (!isEmpty(state.customers.customers)) ? state.customers.customers.total : Config.TOTAL_RECORD
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
		getCustomer : (params) => {
            dispatch(actFetchCustomersRequest(params));
        },
        confirmDelete: (params) => {
            dispatch(confirmDelete(params));
        }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
