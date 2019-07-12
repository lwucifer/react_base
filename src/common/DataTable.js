import React, { Component } from 'react';
import Pagination from './Pagination';
import { faSortUp, faSortDown,faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DataTable extends Component {
    constructor(props) {
		super(props);
		this.state = {};
    }
 
    onSort = (column) => {
        return e => {
            const type = this.props.sortColumn ? (this.props.sortType === 'asc' ? 'desc' : 'asc') : 'desc';
            this.props.onSort(column, type);
        }
    }

    head = () => {
        let result = null;
        if(this.props.titles){
            let {titles} = this.props;
            if(Object.keys(titles).length > 0){
                result = Object.entries(titles).map((title, index) => {
                    let active = '';
                    let sortIcon = '';
                    if(this.props.is_sort && title[1].sortBy){
                        sortIcon = <FontAwesomeIcon icon={faSort} />;
                        if( title[1].sortBy === this.props.sortColumn ){
                            if(this.props.sortType === 'desc')
                                sortIcon = <FontAwesomeIcon icon={faSortDown} />;
                            else
                                sortIcon = <FontAwesomeIcon icon={faSortUp} />;
                            active = 'active-' + this.props.sortType;
                        }
                    } 
                    return (
                        <th key={index} onClick={title[1].sortBy ? this.onSort(title[1].sortBy) : null }  className={ active  + " "+ title[1].class}> {sortIcon} <span> {title[1].name} </span></th>
                    );
                })
            }
        }
        return result;
    }

    PaginationInfo = (page, type) => {
        this.props.onChangePage(page, type);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead>
                        <tr>
                            {this.head()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table> 
                <Pagination totalRecord={ this.props.totalRecord } pageSize={ this.props.pageSize } PaginationInfo={ this.PaginationInfo } currentPage={this.props.currentPage}/>
            </div>
        );
    }
}

export default DataTable;