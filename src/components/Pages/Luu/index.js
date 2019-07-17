import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Config from '../../../constants/config'
import {merge, isEmpty} from 'lodash';
import $ from 'jquery';

// import file
import {actEditUserRequest, actFetchUsersRequest, confirmUserDelete, setTitlePage} from '../../../actions/index'
import {faSort} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
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
            users: [],
            inEditMode: [],
            is_sort: true,
            is_delete: false
        };
        document.title = "Spring Luu"
    }

    componentWillMount() {
        this.props.setTitle('Spring');
        if (isEmpty(this.props.customers)) {
            this.getUsersData();
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.users && nextProps.users.pagination) {
            this.setState({
                users: nextProps.users,
                page: nextProps.users.pagination.current_page,
                totalRecord: nextProps.users.pagination.total
            });
        }


    }



    onChangePage = (info, type) => {
        if (type && type === 'changePage') {
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
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState(prevState => ({
            pagination: {
                ...prevState.pagination,
                [name]: value
            }
        }));
    }

    onChangeLimit = (event) => {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
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
        if (event.target.checked) {
            if (array.indexOf(event.target.value) === -1) {
                array.push(event.target.value);
            }
        } else {
            var index = array.indexOf(event.target.value);
            if (index !== -1) {
                array.splice(index, 1);
            }
        }
        this.setState({checked: array});
    }

    changeEditMode = (event) => {
        var data = this.state.inEditMode;
        let id = event.target.value;
        if (event.target.checked) {
            data[id] = true;
        } else {
            data[id] = false;
        }
        this.setState({inEditMode: data});
    }

    saveInline = (event) => {
        let id = event.target.value;
        let params = {
            id: id,
            username: $('#name_' + id).val(),
            division_name: $('#division_name_' + id).val()
        };
        this.props.saveUser(params);
        var data = this.state.inEditMode;
        data[id] = false;
        this.setState({inEditMode: data});
    }

    handleDelete = () => {
        if (this.state.checked && !isEmpty(this.state.checked)) {
            let params = {
                ids: this.state.checked
            }
            this.props.confirmDelete(params);
        }
    }

    render() {
        const {t} = window.lang;
        let users = this.state.users;
        return (
            <div className="border">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="border-bottom pt-3 pb-3">
                            <h3>画面イメージ</h3>
                        </div>
                        <div className="d-flex align-items-center col border-bottom pt-2 pb-2">
                            <h3>業務システム</h3>
                            <div className="ml-auto">
                                <span>ログインユーザー：</span><span>三井研</span>
                                <button className="btn ml-4">メインメニュー</button>
                                <button className="btn ml-2">ログアウト</button>
                            </div>
                        </div>
                        <div className="table-title">
                            <h5>基礎データ更新入力</h5>
                        </div>
                        <form className="row m-3 align-items-center form-inline form-cus border">
                            <table className="table table-bordered col-sm-6 p-0 mb-0">
                                <tbody>
                                <tr>
                                    <th>区分</th>
                                    <td>
                                        <input id="radio1" type="radio" name="radio" value="1" className="form-control border-0 ml-3 mr-2"/>
                                        <span htmlFor="radio1">区分</span>
                                        <input id="radio2" type="radio" name="radio" value="2" className="form-control border-0 ml-4 mr-2"/>
                                        <span htmlFor="radio2">区分</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="double-form">
                                        <input type="text" name="" className="form-control"/>
                                        <span className="m-1">~</span>
                                        <input type="text" name="" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="double-form">
                                        <input type="text" name="" className="form-control"/>
                                        <span className="m-1">~</span>
                                        <input type="text" name="" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="double-form">
                                        <input type="text" name="" className="form-control"/>
                                        <span className="m-1">~</span>
                                        <input type="text" name="" className="form-control"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <table className="table table-bordered col-sm-4 p-0 mb-0">
                                <tbody>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td>
                                        <input type="text" name="" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="double-form">
                                        <input type="text" name="" className="form-control"/>
                                        <span className="m-1">~</span>
                                        <input type="text" name="" className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>区分</th>
                                    <td className="form-search">
                                        <input type="text" name="" className="form-control"/>
                                        <button className="form-control"><FontAwesomeIcon icon={faSearch}/></button>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="background-none border-right-0"></th>
                                    <td className="border-left-0">
                                        <span className="form-control hidden"/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="col-sm-2 p-0">
                                <button className="btn btn-primary" type="submit">検索</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12">
                        <div className="p-3">
                            <React.Suspense fallback={renderLoader()}>
                                <DataTable
                                    titles={this.titles()}
                                    sortColumn={this.state.pagination.sortColumn}
                                    sortType={this.state.pagination.sortType}
                                    totalRecord={this.props.totalRecord}
                                    pageSize={this.state.pagination.pageSize}
                                    currentPage={this.state.pagination.page}
                                    onSort={this.onSort}
                                    is_sort={this.state.is_sort}
                                    onChangePage={this.onChangePage}
                                >
                                    {users && users.list && users.list.map((item, key) => {
                                        return (
                                            this.state.inEditMode[item.id] ?
                                                <RederEditView key={item.id} keyProp={item.id} item={item}
                                                               onCheck={this.onChangeChbox}
                                                               onSave={this.saveInline}
                                                               onEdit={this.changeEditMode}/>
                                            : <RederDefaultView key={item.id} keyProp={item.id} item={item}
                                                                onCheck={this.onChangeChbox}
                                                                onEdit={this.changeEditMode}/>
                                        )
                                    })}
                                </DataTable>
                            </React.Suspense>
                            <div className="danger">
                                <div className="alert-danger">error 666</div>
                                <div className="alert-danger">error 777</div>
                                <div className="alert-danger">error 888</div>
                                <div className="alert-danger">error 999</div>
                            </div>
                        </div>
                    </div>
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
        const {t} = window.lang;
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
            },
            inline: {
                name: t("users.inline"),
                sortBy: "",
                class: "c7"
            }
        }
    }
}

function RederDefaultView(props) {
    return (
        <tr>
            <td>
                <input type="checkbox" defaultValue={props.item.id} onChange={props.onEdit}/>
            </td>
            <td><input type="text" disabled defaultValue={props.item.username} className="form-control"/></td>
            <td>{props.item.division_name}</td>
            <td>{props.item.email}</td>
            <td><Link to={`/user/edit/${props.item.id}`}><img src="" className="penIcon"/></Link></td>
            <td>
                <input type="checkbox" value={props.item.id} onChange={props.onCheck}/>
            </td>
        </tr>
    );
}
function RederEditView(props) {
    return (
        <tr>
            <td>
                <input type="checkbox" checked defaultValue={props.item.id} onChange={props.onEdit}/>
                <button type="button" onClick={props.onSave} value={props.item.id} className="btn btn-primary ml-3">save</button>
            </td>
            <td><input type="text" defaultValue={props.item.username} name="name" id={'name_' + props.item.id} className="form-control"/></td>
            <td><input type="text" defaultValue={props.item.division_name} name="division" id={'division_name_' + props.item.id} className="form-control"/></td>
            <td><input type="text" defaultValue={props.item.email} name="email" id={'email_' + props.item.id} className="form-control"/></td>
            <td><Link to={`/user/edit/${props.item.id}`}><img src="" className="penIcon"/></Link></td>
            <td>
                <input type="checkbox" value={props.item.id} onChange={props.onCheck}/>
            </td>
        </tr>
    );
}

const mapStateToProps = (state) => {
    var total = Config.TOTAL_RECORD;
    var page = Config.PAGE;
    if (state.users.users && state.users.users.pagination && state.users.users.pagination.total) {
        total = state.users.users.pagination.total;
        page = state.users.users.pagination.current_page;
    }

    return {
        users: state.users.users,
        totalRecord: total,
        page: page,
        is_delete: state.users.is_delete ? true : false,
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setTitle: (params) => {
            dispatch(setTitlePage(params));
        },
        getUsers: (params) => {
            dispatch(actFetchUsersRequest(params));
        },
        confirmDelete: (params) => {
            dispatch(confirmUserDelete(params));
        },
        saveUser: (params) => {
            dispatch(actEditUserRequest(params));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
