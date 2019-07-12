import React, { Component } from 'react';
// Modal
import Modal from 'react-responsive-modal';
// SweetAlert
import {SweetAlert} from '../../common/Utils';
import Notification from './notification';
export default class componentName extends Component {
    constructor( props ){
        super( props );
        this.state = {
            open: false,
            openSecond: false
        }
        this.child = React.createRef();
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };
     
    onCloseModal = () => {
        this.setState({ open: false });
    };

    onOpenSecondModal = () => {
        this.setState({ openSecond: true });
        this.onCloseModal();
    };
     
    onCloseSecondModal = () => {
        this.setState({ openSecond: false });
        this.onOpenModal();
    };

    SweetAlert = () => {
        SweetAlert('test');
    }

    callNotification = (type) => {
        this.child.current.addNotification("Awesome!");
    };

    render() {
        return (
            <div> 
                <button className="btn btn-primary" onClick={this.onOpenModal}>Open modal</button>
                <br/><br/>
                <button className="btn btn-info" onClick={this.SweetAlert}>Alert</button>
                <br/> <br/>

                <Notification ref={this.child} />
                <button className='btn btn-warning' onClick={this.callNotification}>Click</button>

                <Notification />
                <Modal open={this.state.open} closeOnEsc={false} onClose={this.onCloseModal} center>
                    <div className="header">
                        <h2>First modal</h2>
                    </div>
                    <div className="body">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        </p>
                        <button className="btn btn-primary" onClick={this.onOpenSecondModal}>Open Second modal</button>
                        <button className="btn btn-info" onClick={this.SweetAlert}>Alert</button>
                    </div>
                    <br/>
                    <div className="footer">
                        <button className="btn btn-danger" onClick={this.onCloseModal}>Close</button>
                    </div>
                </Modal>   

                <Modal open={this.state.openSecond} onClose={this.onCloseSecondModal} center>
                    <h2>Second modal</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    </p>
                </Modal> 
            </div>
        );
    }
}
