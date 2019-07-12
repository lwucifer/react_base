import React, { Component } from 'react';

const defaultProps = {
    initialPage: 1
}

class PaginationAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pager: {},
            type: 'changePage'
        };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.totalRecord && this.props.totalRecord > 0) {
            this.setPage(defaultProps.initialPage);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.totalRecord && nextProps.totalRecord > 0){
            this.setPage(this.props.currentPage, null , nextProps.totalRecord);
        }
    }

    setPage(page, type = null, totalRecordProps = null) {
        var totalRecord = (totalRecordProps) ? totalRecordProps : this.props.totalRecord;
        var pageSize = this.props.pageSize;
        var pager = this.state.pager;
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        // get new pager object for specified page
        pager = this.getPager(totalRecord, page, pageSize);

        // update state
        this.setState({ pager: pager });
        // call change page function in parent component
        this.props.onChangePage(pager, type);
    }

    getPager(totalRecord, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 5;

        // calculate total pages
        var totalPages = Math.ceil(totalRecord / pageSize);

        var startPage, endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalRecord - 1);

        // create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalRecord: totalRecord,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    render() {
        var pager = this.state.pager;
        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        let {t} = window.lang;
        return (
            <nav role="navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <span onClick={() => this.setPage(1, this.state.type)}>{t("pagination.First")}</span>
                    </li>
                    <li className={`page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <span onClick={() => this.setPage(pager.currentPage - 1, this.state.type)}>{t("pagination.Prev")}</span>
                    </li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <span onClick={() => this.setPage(page, this.state.type)}>{page}</span>
                        </li>
                    )}
                    <li className={`page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <span onClick={() => this.setPage(pager.currentPage + 1, this.state.type)}>{t("pagination.Next")}</span>
                    </li>
                    <li className={`page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <span onClick={() => this.setPage(pager.totalPages, this.state.type)}>{t("pagination.Last")}</span>
                    </li>
                </ul>
            </nav>
        );
    }
}

class Pagination extends Component {
    constructor() {
        super();
        this.state = {};
    }

    onChangePage = (page, type) => {
        return this.props.PaginationInfo(page, type);
    }
    
    render() {
        if(this.props.totalRecord){
            return (
                <div>
                    <PaginationAction onChangePage={this.onChangePage} totalRecord={this.props.totalRecord} pageSize={this.props.pageSize} currentPage={this.props.currentPage}/>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        } 
    }
}

export default Pagination;