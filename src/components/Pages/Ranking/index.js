import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Config from '../../../constants/config'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {merge, isEmpty} from 'lodash';
// import file
import {actFetchCustomersRequest, confirmDelete, setTitlePage} from '../../../actions';
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
            checked: []
        };
        document.title = "ランキング"
    }
    
    componentWillMount(){
        this.props.setTitle('ランキング');
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
        const { t } = window.lang;
        let { customers} = this.props;
        if(customers.response){
            console.log(customers.response.data);
        }
        return (

                <div className="row">
                    <div className="col-sm-6 data-filter">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td className="title">{t('ranking.token')}</td>
                                    <td className="title-second">
                                        <div className="radioOptions">
                                            <div className="floatBlock">
                                                <label htmlFor="rdb1"> <input id="rdb1" name="rdbutton" type="radio" value="0" onChange={this.onChangeForm} defaultChecked/>  {t('ranking.like')}  </label>
                                            </div>
                                            <div className="floatBlock">
                                                <label htmlFor="rdb2"> <input id="rdb2" name="rdbutton" type="radio" value="1" onChange={this.onChangeForm}/> {t('ranking.thank')} </label>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="title">{t('ranking.time')}</td>
                                    <td className="title-second">
                                        
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
                  
                        <button className="buttonWhite float-right" onClick={ this.handleSearch } >再集計</button>
                        <br/><br/>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <select className="form-control"  name="sltOption" onChange={this.onChangeLimit}>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <label className="col-sm-2 col-form-label">{t('ranking.display')}</label>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="col-sm-10">
                        <React.Suspense fallback={renderLoader()}>
                            <DataTable 
                                titles={this.titles()}
                                sortColumn={this.state.pagination.sortColumn} 
                                sortType={this.state.pagination.sortType} 
                                totalRecord={ this.props.totalRecord }
                                pageSize={this.state.pagination.pageSize}
                                currentPage={this.state.pagination.page}
                                onSort={ this.onSort }
                                onChangePage={this.onChangePage}
                            >

                                {customers.response && customers.response.data && customers.response.data.map( (item, key) => {
                                    return (
                                        <tr key = {key} >
                                            <td>{item.id}</td>
                                            <td>{item.user.first_name + " " + item.user.last_name}</td>
                                            <td>{ item.amount_like }</td>
                                           
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

    titles = () => {
        const { t } = window.lang;
        return {
            id: {
                name: t('ranking.rank'),
                sortBy: "customers.emotion",
                class: "c1"
            },
            name: {
                name: t('ranking.name'),
                sortBy: "customers.name",
                class: "c3"
            },
            is_active: {
                name: t('ranking.received_amount'),
                sortBy: "customers.gender",
                class: "c5"
            }
        }
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
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
		getCustomer : (params) => {
            dispatch(actFetchCustomersRequest(params));
        },
        confirmDelete: (params) => {
            dispatch(confirmDelete(params));
        }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
