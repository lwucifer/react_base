import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actEditUserRequest} from '../../actions/index';
import SimpleReactValidator from 'simple-react-validator';
class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            username: '',
            division_name: '',
            email: ''
        }
        this.validator = new SimpleReactValidator({
            element: message => <p className="error">{message}</p>,
            messages: {
                required: window.lang.t('validator.required', { attribute: ':attribute' }),
                alpha: 'The :attribute may only contain letters.'
            }
        });
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params.id) {
            var id = this.props.match.params.id;
            if(this.props.users && this.props.users.list){
                var data = this.props.users.list[id];
                this.setState({
                    id: data.id,
                    username: data.username ? data.username : "",
                    division_name: data.division_name ? data.division_name : "",
                    email: data.email,
                });
            }
        }
    }

    componentWillReceiveProps(nextprops){
        if(nextprops.is_edit){
            this.setState({ is_edit: nextprops.is_edit })
        }
	}

    onChangeForm = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox'? target.checked:target.value;
		this.setState({
			[name]: value
		});
    }
    
    handleEdit = () => {
        if (this.validator.allValid()) {
            let params = {
                token: localStorage.getItem('access_token'),
                id: this.state.id,
                username: this.state.username,
                division_name: this.state.division_name,
                email: this.state.email
            }
            this.props.onEditUser(params)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        if(!this.state.is_edit){
            return (
                <div>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">氏名</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticName" onChange={this.onChangeForm} name="username" value={this.state.username} />
                                {this.validator.message('name', this.state.username, 'required')}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">部署</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticDivisonName" onChange={this.onChangeForm} name="division_name" value={this.state.division_name} />
                                {this.validator.message('division_name', this.state.division_name, 'required')}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">メールアドレス</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticEMail" onChange={this.onChangeForm} name="email" value={this.state.email} />
                                {this.validator.message('email', this.state.email, 'required')}
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        <div className="col-sm-6">
                            <button style={styles.right10} type="button" className="buttonWhite" onClick={this.handleEdit} >確定</button>
                            <Link  to="/user/"> <button className="buttonGray">キャンセル</button> </Link>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="col-sm-8">
                    <div className="panel panel-default table-responsive">
                        <div className="panel-heading"></div>
                        <div className="panel-body">
                            <p>Success</p>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">氏名</th>
                                    <th className="text-center">部署</th>
                                    <th className="text-center">メールアドレス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.customer.emotion}</td>
                                    <td>{this.props.customer.name}</td>
                                    <td>{this.props.customer.gender}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to="/user/"> <button className="buttonWhite">ユーザ一覧へ戻る</button></Link>
                    </div>
                </div>
            )
        }    
    }
}
var styles = {
    right10: {
        marginRight: 10
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.status ? state.users.users : [],
        is_edit: (state.customers.is_edit) ? true :false
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // getUser : (id) => {
		// 	dispatch(FetchUserRequest(id));
        // },
        onEditUser : (params) => {
            dispatch(actEditUserRequest(params));
		},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(edit);