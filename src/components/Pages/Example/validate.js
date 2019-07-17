import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9'},
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630'},
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];
class validate extends Component {
    constructor( props ){
        super( props );
        this.state = {
            selected: colourOptions[3].value,
            selectedMulti: [colourOptions[1].value, colourOptions[3].value],
            title: "",
            currency: "",
            date: "",
            phone: ""
        }
        this.validator = new SimpleReactValidator({
            element: message => <p className="error">{message}</p>,
            messages: {
                required: window.lang.t('validator.required', { attribute: ':attribute' }),
                alpha: 'The :attribute may only contain letters.'
            }
        });
    }

    submitForm = () => {
        console.log(this.state);
        if (this.validator.allValid()) {
            console.log('You submitted the form and stuff!');
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }

    handleChange = (event) => {
        if(event.label){
            this.setState({ 'selected': event.value });
            return;
        }
        let { name, value } = event.target;
        this.setState( { [ name ]: value } );
    }

    handleSelectMulti = (options) => {
        var selectedMulti = options.map(function (selected) {
            return selected.value;
        });
        this.setState({ 'selectedMulti': selectedMulti });
    }

    InputMask(name, value, rules = 'required', type = 'text') {
        value = value || this.state[name];
        rules = rules || name;
        return (
            <div className="col-sm-6 col-md-6">
                <div className="form-group">
                    <label>{ window.lang.t( name ) }</label>
                    <input className="form-control" type={type} name={name} value={this.state[name]} onChange={this.handleChange.bind(this)} />
                    {this.validator.message(name, value, rules)}
                </div>
            </div>
        );
    }

    currencyMask (name, value ,thousandSeparator = null, prefix = null, placeholder = null, format = null, mask = null, rules = 'required') {
        value = value || this.state[name];
        rules = rules || name;
        return (
            <div className="col-sm-6 col-md-6">
                <div className="form-group">
                    <label>{name}</label>
                    {/* Input currency with prefix: $ */}
                    <CurrencyFormat className="form-control" name={name} thousandSeparator={thousandSeparator} prefix={prefix} format={format} mask={mask} value={value} placeholder={placeholder} onChange={this.handleChange.bind(this)}/>
                    {this.validator.message(name, value, rules)}
                </div>
            </div>
        );
    }
 
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label>Title 1</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleChange} />
                            {this.validator.message('title', this.state.title, 'required|alpha')}
                        </div>
                    </div>

                    {this.InputMask('title', this.state.title, 'required|alpha')}

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            {/* Display currency */}
                            <CurrencyFormat value={this.state.currency} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <div>{value}</div>} />
                        </div>
                    </div>

                    {this.currencyMask('currency', this.state.currency, true, '$', '$0', null, null,'required' )}

                    {this.currencyMask('date', this.state.date, null, null, 'YYYY-MM-DD', '####-##-##', [ 'Y', 'Y', 'Y', 'Y', 'M', 'M', 'D', 'D'], 'required' )}

                    {this.currencyMask('phone', this.state.phone, null, null, '+84 xxx xxx xxx', "+84 ### ### ###", '_', 'required' )}

                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label>Select</label>
                            <Select
                                defaultValue={colourOptions[3]}
                                options={colourOptions}
                                onChange={this.handleChange}
                            />
                            {this.validator.message('selected', this.state.selected, 'required')}
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="form-group">
                            <label>Select Multi</label>
                            <Select
                                defaultValue={[colourOptions[1], colourOptions[3]]}
                                isMulti
                                onChange={this.handleSelectMulti}
                                options={colourOptions}
                            />
                        </div>
                    </div>

                    <div className="clearfix"></div>
                    <br/><br/>
                    <button className="btn btn-primary" onClick={this.submitForm}>Save Review</button>
                </div>    
            </div>
        );
    }
}

export default validate;