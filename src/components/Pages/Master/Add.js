import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {actAddUserRequest, setTitlePage} from '../../../actions/index';
import SimpleReactValidator from 'simple-react-validator';
import {isEmpty, findIndex} from 'lodash';

class add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            division_name: '',
            email: '',
            message: [],
            is_admin: false,
            is_add: false
        }
        this.validator = new SimpleReactValidator({
            element: message => <p className="error">{message}</p>,
            messages: {
                required: window.lang.t('validator.required', {attribute: ':attribute'}),
                alpha: 'The :attribute may only contain letters.',
                min: 'The :attribute must be at least 6 characters.'
            }
        });
        document.title = "ユーザ修正"
    }

    componentWillMount() {
        this.props.setTitle('ユーザ修正');
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            message: nextprops.message ? nextprops.message : [],
            is_add: nextprops.is_add ? nextprops.is_add : false
        })
    }

    onChangeForm = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    handleAdd = () => {
        this.setState({
            is_add: false
        });
        if (this.validator.allValid()) {
            let params = {
                token: localStorage.getItem('access_token'),
                company_code: 'company_code_1',
                created_by: 2,
                last_updated_by: 2,
                is_admin: this.state.is_admin,
                id: this.state.id,
                username: this.state.username,
                division_name: this.state.division_name,
                email: this.state.email
            }
            this.setState({
                message: []
            });
            this.props.onAddUser(params);
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        let {t} = window.lang;
        return (
            <div className="border">
                <div>
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
                <form className="p-3">
                    <table className="table-bordered table text-left">
                        <tbody>
                            <tr>
                                <th>部署コード</th>
                                <td>
                                    <input type="text" className="form-control-plaintext" id="staticName" onChange={this.onChangeForm} name="username"/>
                                    <span style={styles.floatleft}>{this.validator.message('name', this.state.username, 'required|min:6')}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>部署コード</th>
                                <td>
                                    <input type="text" className="form-control-plaintext" id="staticDivisionName" onChange={this.onChangeForm} name="division_name"/>
                                    <span style={styles.floatleft}>{this.validator.message('division_name', this.state.division_name, 'required|min:6')}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>部署名</th>
                                <td>
                                    <input type="text" className="form-control-plaintext" id="staticEMail"
                                           onChange={this.onChangeForm} name="email"/>
                                    <span style={styles.floatleft}>
                                        {this.validator.message('email', this.state.email, 'required|min:6|email')}
                                        <p className="error">{this.state.message.email ? t("users.The_email_has_already_been_taken") : ''}</p>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>システム管理者権限</th>
                                <td>
                                    <select name="is_admin" className="form-control w-auto" id="isAdmin" onChange={this.onChangeForm}>
                                        <option value="0">空</option>
                                        <option value="1">○</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="row m-0">
                        {this.state.is_add && <p className="alert alert-success">Success</p>}
                        <div className="ml-auto">
                            <button style={styles.right10} type="button" className="btn btn-primary" onClick={this.handleAdd}>確定</button>
                            <Link to="/master/" className="btn">キャンセル</Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

var styles = {
    right10: {
        marginRight: 10
    },
    floatleft: {
        float: "left"
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        message: state.users.message ? state.users.message : [],
        is_add: state.users.is_add ? state.users.is_add : false
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        setTitle: (params) => {
            dispatch(setTitlePage(params));
        },
        onAddUser: (params) => {
            dispatch(actAddUserRequest(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(add);
