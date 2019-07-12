import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Hook from './hooks';
class index2 extends Component {

    render() {
        return (
            <div>
                this is index 2
                {/* <button onClick={this.getData} type="button" className="btn btn-success btn-large btn-block btn-default">button</button> */}
                <Link className="nav-link" to="/">Index</Link>
                <Hook />
            </div>
        );
    }
}

export default index2;