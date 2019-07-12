import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actAddCustomerRequest} from '../../actions/index';
import SimpleReactValidator from 'simple-react-validator';
class edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emotion: '',
            name: '',
            gender: ''
        }
        this.validator = new SimpleReactValidator({
            element: message => <p className="error">{message}</p>,
            messages: {
                required: window.lang.t('validator.required', { attribute: ':attribute' }),
                alpha: 'The :attribute may only contain letters.'
            }
        });
    }

    componentWillReceiveProps(nextprops){
        if(nextprops.is_add){
            this.setState({ is_add: nextprops.is_add })
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
    
    handleAdd = () => {
        if (this.validator.allValid()) {
            let params = {
                emotion: this.state.emotion,
                name: this.state.name,
                gender: this.state.gender
            }
            this.props.onAddCustomer(params)
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        if(!this.state.is_add){
            return (
                <div>
                    <form>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Emotion</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticEmotion" onChange={this.onChangeForm} name="emotion" value={this.state.emotion} />
                                {this.validator.message('emotion', this.state.emotion, 'required')}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticName" onChange={this.onChangeForm} name="name" value={this.state.name} />
                                {this.validator.message('name', this.state.name, 'required')}
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Gender</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control-plaintext" id="staticGender" onChange={this.onChangeForm} name="gender" value={this.state.gender} />
                                {this.validator.message('gender', this.state.gender, 'required')}
                            </div>
                        </div>
                        <div className="clearfix"></div>

                        <div className="col-sm-6">
                            <button style={styles.right10} type="button" className="buttonWhite" onClick={this.handleAdd} >Submit</button>
                            <Link to="/user/list"> <button className="buttonGray"> Cancel </button> </Link>
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
                                    <th className="text-center">Emotion</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Gender</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.state.emotion}</td>
                                    <td>{this.state.name}</td>
                                    <td>{this.state.gender}</td>
                                </tr>
                            </tbody>
                        </table>
                        <Link to="/user/list"> <button className="buttonWhite"> Cancel </button> </Link>
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
        is_add: (state.customers.is_add) ? true :false
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddCustomer : (params) => {
            dispatch(actAddCustomerRequest(params));
		},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(edit);