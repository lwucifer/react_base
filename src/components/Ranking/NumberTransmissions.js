import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import * as Config from '../../constants/config'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {merge, isEmpty} from 'lodash';
// import file
import { FetchNumberTransmissions, setTitlePage} from '../../actions/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const option = {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
};
const DataTable = React.lazy(() => {
    return new Promise(resolve => setTimeout(resolve, 100)).then(
        () => import("../../common/DataTable")
    );
});

const renderLoader = () => <p>Loading</p>;
class NumberTransmissions extends Component {
    constructor(props) {
		super(props);
		this.state = {
            pagination: Config.PAGINATION_CONFIG,
            type: 1,
            is_sort: false
        };
        document.title = "送信回数"
    }
    
    componentWillMount(){
        this.props.setTitle('送信回数');
        if(isEmpty( this.props.number_transmissions )){
            this.getNumberTransmissions();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.receptions){
             this.setState({
                 page: nextProps.current_page,
                 totalRecord: nextProps.total
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
                this.getNumberTransmissions();
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
            this.getNumberTransmissions();
        })
    }

    onChangeTypeForm = (event) => {
		var target = event.target;
		var name = target.name;
        var value = target.type === 'checkbox'? target.checked:target.value;
        this.setState({
            [name]: value
        });
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
            this.getNumberTransmissions();
        })
    }

    render() {
        const { t } = window.lang;
        let { number_transmissions } = this.props;
        return (
            <div className="row">
                 <div className="col-lg-7 col-sm-6 data-filter">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td className="title">{t('ranking.token')}</td>
                                <td className="title-second">
                                    <div className="radioOptions">
                                        <div className={`floatBlock ${parseInt(this.state.type) === 1 ? 'activeCheckbox' : ''}`}>
                                            <label htmlFor="type_like"> <input id="type_like" name="type" type="radio" value="1" onChange={this.onChangeTypeForm} defaultChecked/>  {t('ranking.like')}  </label>
                                        </div>
                                        <div className={`floatBlock ${parseInt(this.state.type) === 2 ? 'activeCheckbox' : ''}`}>
                                            <label htmlFor="type_thank"> <input id="type_thank" name="type" type="radio" value="2" onChange={this.onChangeTypeForm} /> {t('ranking.thank')} </label>
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
                            is_sort= {this.state.is_sort}
                            onChangePage={this.onChangePage}
                        >
                            {number_transmissions && number_transmissions.length > 0 && number_transmissions.map( (item, key) => {
                                return (
                                    <tr key = {key} >
                                        <td>{this.getNo(key)}</td>
                                        <td>{item.user.first_name + "" + item.user.last_name }</td>
                                        <td>{ (String(this.state.type) === "1") ? item.amount_thanks : item.amount_like }</td>
                                    </tr>
                                )
                            })}
                        </DataTable>
                    </React.Suspense>
                </div>
                <ToastContainer />
            </div>
        );
    }
    getNo = (key) => {
        var no = this.state.pagination.page < 2 ? key+1: ((this.state.pagination.page-1)*this.state.pagination.pageSize)+key+1;
        switch(no) {
            case 1:
                return <img src={ require('../../../public/icon/rank1.png') } className="rankIcon" />;
            case 2:
                return <img src={ require('../../../public/icon/rank2.png') } className="rankIcon" />;
            case 3:
                return <img src={ require('../../../public/icon/rank3.png') } className="rankIcon" />;
            default:
                return no;
        }
    }
    getNumberTransmissions = (meta = null) => {
        let params = {
            start_time: moment(this.state.pagination.startDate).format("YYYY-MM-DD"),
            end_time: moment(this.state.pagination.endDate).format("YYYY-MM-DD"),
            type: this.state.type,
            type_value: 1,
            page: this.state.pagination.page,
            limit: this.state.pagination.pageSize
        };
        if(moment(params.start_time).diff(params.end_time, 'minutes') > 1){
            var {t} = window.lang;
            toast.error( t("charts.start_date_is_greater_than_end_date"), option);
            this.setState({ 
                show: false
            });
        } else {
            let data = merge(params, meta);
            this.props.getNumberTransmissions(data);
        }
    }

    handleSearch = () => {
        let params = {
            type: this.state.type
        }
        this.getNumberTransmissions(params);
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
                sortBy: "ranking.emotion",
                class: "c1"
            },
            name: {
                name: t('ranking.name'),
                sortBy: "ranking.name",
                class: "c3"
            },
            is_active: {
                name: t('ranking.received_amount'),
                sortBy: "ranking.gender",
                class: "c5"
            }
        }
    }
}

const mapStateToProps = (state) => {
    var total = Config.TOTAL_RECORD;
    var page = Config.PAGE;
    if(state.ranking.number_transmissions && state.ranking.number_transmissions.pagination && state.ranking.number_transmissions.pagination.total){
        total = state.ranking.number_transmissions.pagination.total;
        page = state.ranking.number_transmissions.pagination.current_page;
    }
	return {
        number_transmissions: state.ranking.number_transmissions ? state.ranking.number_transmissions.list : [],
        totalRecord: total,
        page: page
	};
}
const mapDispatchToProps = (dispatch, props) => {
	return {
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
		getNumberTransmissions : (params) => {
            dispatch(FetchNumberTransmissions(params));
        }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(NumberTransmissions);