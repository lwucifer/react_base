import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class notification extends Component {
    constructor( props ){
        super( props );
        this.state = {
            open: false,
            openSecond: false
        }
        this.addNotification = this.addNotification.bind(this);
    }

    addNotification(title = null, type = "default") {
        let option = {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        };
        switch(type) {
            case "success":
                toast.success( title, option);
                break;
            case "error":
                toast.error( title, option);
                break;
            case "warn":
                toast.warn( title, option);
                break;
            case "info":
                toast.info( title, option);
                break;  
            default:
                toast(title, option);
        }
    }

    render() {
        return (
            <div>
                <ToastContainer />
            </div>
        );
    }
}

export default notification;