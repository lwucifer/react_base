import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Config from '../../constants/config'
import {merge, isEmpty} from 'lodash';
// import file
import {actFetchUsersRequest, confirmUserDelete, setTitlePage} from '../../actions/index'
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
            checked: [],
            is_sort: true,
            is_delete: false
        };
        document.title = "Spring Luu"
    }

    componentWillMount(){
        this.props.setTitle('Spring');
        if(isEmpty( this.props.customers )){
            this.getUsersData();
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.users && nextProps.users.pagination){
            this.setState({
                page: nextProps.users.pagination.current_page,
                totalRecord: nextProps.users.pagination.total
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
                this.getUsersData();
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
            this.getUsersData();
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
            this.getUsersData();
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
        if(this.state.checked && !isEmpty( this.state.checked )){
            let params = {
                ids: this.state.checked
            }
            this.props.confirmDelete(params);
        }
    }

    render() {
        const { t } = window.lang;
        let { users } = this.props;
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="form-group row">
                        <div className="col-sm-1">
                            <select className="form-control"  name="sltOption" onChange={this.onChangeLimit}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <label className="col-sm-2 col-form-label">{t("users.display")}</label>
                        <div className="col-sm-7">
                            <button className="buttonWhite float-right" onClick={ this.handleDelete } >{t("users.delete")}</button>
                        </div>
                    </div>
                </div>
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
                            is_sort={this.state.is_sort}
                            onChangePage={this.onChangePage}
                        >
                            {users && users.list && users.list.map( (item, key) => {
                                return (
                                    <tr key = {key} >
                                        <td>{ item.username }</td>
                                        <td>{ item.division_name }</td>
                                        <td>{ item.email }</td>
                                        <td> <Link to={`/user/edit/${item.id}`} > <img src={ require('../../../public/icon/pen.png') } className="penIcon" /> </Link> </td>
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

    getUsersData = (meta = null) => {
        let params = {
            page: this.state.pagination.page,
            perPage: this.state.pagination.pageSize,
            sortColumn: this.state.pagination.sortColumn,
            sortType: this.state.pagination.sortType,
        };
        let data = merge(params, meta);
        this.props.getUsers(data);
    }

    handleSearch = () => {
        let params = {
            sltOption: this.state.sltOption,
            rdbutton: this.state.rdbutton,
            chbox1: this.state.chbox1,
            chbox2: this.state.chbox2
        }

        this.getUsersData(params);
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
                name: t("users.name"),
                sortBy: "users.username",
                class: "c1"
            },
            name: {
                name: t("users.divison_name"),
                sortBy: "users.division_name",
                class: "c3"
            },
            is_active: {
                name: t("users.email"),
                sortBy: "users.email",
                class: "c5"
            },
            created_at: {
                name: t("users.edit"),
                sortBy: "",
                class: ""
            },
            created_at2: {
                name: t("users.delete"),
                sortBy: "",
                class: "c7"
            }
        }
    }
}

const mapStateToProps = (state) => {
    var total = Config.TOTAL_RECORD;
    var page = Config.PAGE;
    if(state.users.users && state.users.users.pagination && state.users.users.pagination.total){
        total = state.users.users.pagination.total;
        page = state.users.users.pagination.current_page;
    }
    return {
        users: state.users.status ? state.users.users : [],
        totalRecord: total,
        page: page,
        is_delete: state.users.is_delete ? true : false,
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setTitle : (params) => {
            dispatch(setTitlePage(params));
        },
        getUsers : (params) => {
            dispatch(actFetchUsersRequest(params));
        },
        confirmDelete: (params) => {
            dispatch(confirmUserDelete(params));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
