import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Config from '../../../constants/config'
import {merge, isEmpty} from 'lodash';
import $ from 'jquery';

// import file
import {actEditUserInlineRequest, actFetchUsersRequest, confirmUserDelete, setTitlePage} from '../../../actions/index'
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
            message: null,
            inEditMode: [],
            is_sort: true,
            is_delete: false,
            statusSave: false,
            row: 0
        };
        document.title = "Nguyen Luu"
    }

    componentWillMount() {
        this.props.setTitle('Spring');
        if (isEmpty(this.props.customers)) {
            this.getUsersData();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users) {
            this.setState({
                message: nextProps.users.message ? nextProps.users.message : [],
            }, () => {
                this.showMessage();
            });
        }

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
        let data = this.state.checked;
        let id = event.target.value;
        if (event.target.checked) {
            data[id] = true;
        } else {
            data[id] = false;
        }
        this.setState({checked: data});
    }

    changeEditMode = (event) => {
        let data = this.state.inEditMode;
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
        this.setState({row: id});
        let params = {
            id: id,
            username: $('#name_' + id).val(),
            email: $('#email_' + id).val(),
            division_name: $('#division_name_' + id).val()
        };
        this.props.saveUser(params);
    }

    showMessage() {
        let id = this.state.row;
        if (!Array.isArray(this.state.message) && !this.state.statusSave) {
        // if (!Array.isArray(this.state.message)) {
            if (this.state.message.email) {
                $('#email_' + id).addClass('border-red');
                $('#row_' + id + ' #email_error').html(
                    '<span class="alert-danger">' + this.state.message.email + '</span>');
            } else {
                $('#email_' + id).removeClass('border-red');
                $('#row_' + id + ' #email_error').html('');
            }
            if (this.state.message.username) {
                $('#name_' + id).addClass('border-red');
                $('#row_' + id + ' #username_error').html(
                    '<span class="alert-danger">' + this.state.message.username + '</span>');
            } else {
                $('#name_' + id).removeClass('border-red');
                $('#row_' + id + ' #username_error').html('');
            }
            if (this.state.message.division_name) {
                $('#division_name_' + id).addClass('border-red');
                $('#row_' + id + ' #division_name_error').html(
                    '<span class="alert-danger">' + this.state.message.division_name + '</span>');
            } else {
                $('#division_name_' + id).removeClass('border-red');
                $('#row_' + id + ' #division_name_error').html('');
            }
        } else {
            let data = this.state.inEditMode;
            data[id] = false;
            this.setState({
                inEditMode: data
            });
        }
    }

    saveAll = () => {
        let self = this;
        this.setState({
            statusSave: true
        });
        let length  = $('.btn-save').length + 1;
        let intervalID = setInterval(function () {
            length--;
            $('.btn-save').trigger('click');
            if (length === 0) {
                self.setState({
                    statusSave: false
                });
                window.clearInterval(intervalID);
            }
        }, 1000);
    }

    handleDelete = () => {
        if (this.state.checked && !isEmpty(this.state.checked)) {
            let array = [];
            this.state.checked.forEach((item, key) => {
                if (item === true) {
                    array.push(key);
                }
            });
            let params = {
                ids: array
            };
            this.props.confirmDelete(params);
        }
    }

    onChangeText = (event) => {
        $('#' + event.target.id).removeClass('border-red').parent().children('.mess').html('');
    }

    render() {
        const {t} = window.lang;
        let {users} = this.state;
        return (
            <div className="border">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="border-bottom pt-3 pb-3 page-title">
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
                    </div>
                    <div className="col-sm-12">
                        <div className="p-3 pt-0">
                            <React.Suspense fallback={renderLoader()}>
                                <Link to={'/mas/add'} className="btn btn-primary pull-right">新規作成</Link>
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
                                                <RenderEditView key={item.id} item={item}
                                                               onCheck={this.onChangeChbox}
                                                               onPress={this.onChangeText}
                                                               onSave={this.saveInline}
                                                               checked={this.state.checked[item.id]}
                                                               onEdit={this.changeEditMode}/>
                                            : <RenderDefaultView key={item.id} item={item}
                                                                onCheck={this.onChangeChbox}
                                                                checked={this.state.checked[item.id]}
                                                                onEdit={this.changeEditMode}/>
                                        )
                                    })}
                                </DataTable>
                            </React.Suspense>
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
                name: "部署コード",
                sortBy: "users.id",
                class: "c1"
            },
            name: {
                name: "部署名",
                sortBy: "users.username",
                class: "c1"
            },
            email: {
                name: "システム管理者権限",
                sortBy: "users.email",
                class: "c1"
            },
        }
    }
}

function RenderDefaultView(props) {
    return (
        <tr>
            <td><Link to={`/mas/edit/${props.item.id}`}>{props.item.id}</Link></td>
            <td>{props.item.username}</td>
            <td>{props.item.email}</td>
        </tr>
    );
}
function RenderEditView(props) {
    return (
        <tr id={'row_' + props.item.id}>
            <td>
                <input type="checkbox" checked defaultValue={props.item.id} onChange={props.onEdit}/>
                <button type="button" onClick={props.onSave} value={props.item.id} className="btn btn-primary btn-save ml-3">save</button>
            </td>
            <td>
                <input type="text" defaultValue={props.item.username} name="name" id={'name_' + props.item.id} className="form-control"/>
                <div id="username_error" className="mess"></div>
            </td>
            <td>
                <input type="text" defaultValue={props.item.division_name} name="division" id={'division_name_' + props.item.id} className="form-control"/>
                <div id="division_name_error" className="mess"></div>
            </td>
            <td>
                <input type="text" defaultValue={props.item.email} name="email" id={'email_' + props.item.id} className="form-control" onChange={props.onPress}/>
                <div id="email_error" className="mess"></div>
            </td>
            <td><Link to={`/user/edit/${props.item.id}`}>edit</Link></td>
            <td><input type="checkbox" defaultChecked={props.checked} value={props.item.id} onChange={props.onCheck}/></td>
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
        message: state.users.message ? state.users.message : []
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
            dispatch(actEditUserInlineRequest(params));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(index);
