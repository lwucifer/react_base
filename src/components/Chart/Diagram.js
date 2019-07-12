import React, { Component } from 'react';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { connect } from 'react-redux';
import { setTitlePage, DiagramData } from '../../actions/index';
cytoscape.use(edgehandles);

class Diagram extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: data,
            type: 0,
            date: "2019-07-02"
        }
        document.title = "ダイヤグラム"
    }

    componentWillMount() {
        this.props.setTitle('ダイヤグラム');
        this.props.loadData(this.state.type, this.state.date);
    }
    
    componentWillReceiveProps(nextProp) {
        if (nextProp.diagrams) {
            this.cytoscape(nextProp.diagrams)
        }
    }

    onChangeForm = (event) => {
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ type: value });
        this.props.loadData(value, this.state.date);
    }
    cytoscape = (d) => {
        cytoscape({
            container: document.getElementById('diagram'),
            layout: layout,
            style: styleCss,
            elements: d,
        });
    }
    render() {
        const { t } = window.lang;
        return (
            <div>

                <div className="radioOptions" style={{ float: 'right', marginBottom: 10 }}>
                    <div className="floatBlock">
                        <label htmlFor="rdb0"> <input id="rdb0" name="type" type="radio" value="0" onChange={this.onChangeForm} defaultChecked />  {t('charts.all')}  </label>
                    </div>
                    <div className="floatBlock">
                        <label htmlFor="rdb1"> <input id="rdb1" name="type" type="radio" value="2" onChange={this.onChangeForm}  />  {t('charts.like')}  </label>
                    </div>
                    <div className="floatBlock">
                        <label htmlFor="rdb2"> <input id="rdb2" name="type" type="radio" value="1" onChange={this.onChangeForm} /> {t('charts.thank')} </label>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div id="diagram" style={{ height: "600px" }}></div>
            </div>

        );
    }
}
const layout = {
    name: 'concentric',
    concentric: function (n) { return n.id() === 'j' ? 200 : 0; },
    levelWidth: function (nodes) { return 100; },
    minNodeSpacing: 100
}
const styleCss = [
    {
        selector: 'node[name]',
        style: {
            'content': 'data(name)',
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "10px",
            "height": "40px",
            "width": "40px",
            "border-width": 0.5,
            "background-color": "#fff",
        }
    },
    {
        selector: 'edge',
        style: {
            'curve-style': 'bezier',
            "line-color": "#ff8c00",
            'target-arrow-color': '#ff8c00',
            'target-arrow-shape': 'triangle',
            "width": 0.5
        }
    },
    {
        selector: '.like1',
        style: {
            'line-color': '#FFCC66',
            width: 1,
            'target-arrow-color': '#FFCC66',
            'source-arrow-color': '#FFCC66'
        }
    },
    {
        selector: '.like2',
        style: {
            'line-color': '#FFCC66',
            width: 2,
            'target-arrow-color': '#FFCC66',
            'source-arrow-color': '#FFCC66'
        }
    },
    {
        selector: '.like3',
        style: {
            'line-color': '#FFCC66',
            width: 3,
            'target-arrow-color': '#FFCC66',
            'source-arrow-color': '#FFCC66'
        }
    },
    {
        selector: '.like4',
        style: {
            'line-color': '#FFCC66',
            width: 4,
            'target-arrow-color': '#FFCC66',
            'source-arrow-color': '#FFCC66'
        }
    },
    {
        selector: '.like5',
        style: {
            'line-color': '#FFCC66',
            width: 5,
            'target-arrow-color': '#FFCC66',
            'source-arrow-color': '#FFCC66'
        }
    },
    //Thank
    {
        selector: '.thank1',
        style: {
            'line-color': '#33CCCC',
            width: 1,
            'target-arrow-color': '#33CCCC',
            'source-arrow-color': '#33CCCC'
        }
    },
    {
        selector: '.thank2',
        style: {
            'line-color': '#33CCCC',
            width: 2,
            'target-arrow-color': '#33CCCC',
            'source-arrow-color': '#33CCCC'
        }
    },
    {
        selector: '.thank3',
        style: {
            'line-color': '#33CCCC',
            width: 3,
            'target-arrow-color': '#33CCCC',
            'source-arrow-color': '#33CCCC'
        }
    },
    {
        selector: '.thank4',
        style: {
            'line-color': '#33CCCC',
            width: 4,
            'target-arrow-color': '#33CCCC',
            'source-arrow-color': '#33CCCC'
        }
    },
    {
        selector: '.thank5',
        style: {
            'line-color': '#33CCCC',
            width: 5,
            'target-arrow-color': '#33CCCC',
            'source-arrow-color': '#33CCCC'
        }
    }
]

const data = {
    nodes: [],
    edges: []
};

const mapStateToProps = (state) => {
    return {
        diagrams: state.chart.diagrams ? state.chart.diagrams : {},
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        loadData: (type, date) => {
            dispatch(DiagramData(type, date));
        },
        setTitle: (params) => {
            dispatch(setTitlePage(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagram);