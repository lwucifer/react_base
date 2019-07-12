import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {actFetchDeleteCustomerRequest, actDeleteCustomerRequest} from '../../actions/index';
class confirmDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            customers: [],
            is_delete: false
        }
       
    }
    componentDidMount() {
        if (this.props.customer) {
            this.setState({
                array: this.props.customer
            });
            this.props.getDeleteCustomer(this.props.customer);
        }
    }

    componentWillReceiveProps(nextprops){
        this.setState({ is_delete: nextprops.is_delete });
		if(nextprops && nextprops.customer){
			this.setState({
                customers: nextprops.customer,
            });
		}
	}
    
    handleDelete = () => {
        this.props.actDeleteCustomer(this.state.array);
    }
    
    render() {
        if(!this.state.is_delete){
            return (
                <div className="col-sm-8">
                    <div className="panel panel-default table-responsive">
                        <div className="panel-heading"></div>
                        <div className="panel-body">
                            <p>Text goes here...</p>
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
                                    {this.state.customers && this.state.customers.map( (item, key) => {
                                        return (
                                            <tr key = {key} >
                                                <td>{item.emotion}</td>
                                                <td>{item.name}</td>
                                                <td>{ item.gender }</td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </table>
                        <button style={styles.right10} type="button" className="buttonWhite" onClick={this.handleDelete} >確定</button>
                        <Link  to="/user/"> <button className="buttonGray">キャンセル</button> </Link>
                    </div>
                </div>
            );
            
        } else {
            return (
                <div className="col-sm-8">
                    <div className="panel panel-default table-responsive">
                        <div className="panel-heading"></div>
                        <div className="panel-body">
                            <p>ユーザの削除が完了しました。</p>
                        </div>
                        <Link  to="/user/"> <button className="buttonGray">キャンセル</button> </Link>
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
        customer: state.customers.customer,
        is_delete: (state.customers.is_delete) ? state.customers.is_delete : false
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getDeleteCustomer : (params) => {
			dispatch(actFetchDeleteCustomerRequest(params));
        },
        actDeleteCustomer: (params) => {
            dispatch(actDeleteCustomerRequest(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(confirmDelete);