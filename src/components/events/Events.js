import React from 'react';
import Chart from 'chart.js';


var maxHorizontalValues = 10;

var config = {
    type: 'line',
    data: {
        labels:[],
        datasets: [{
            label: "Events",
            data: [],
            fill: true,
        }]
    },

    options: {

		    animation: {
		        duration: 0
		    },
        responsive: true,
        tooltips: {
            enabled:false,
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Month'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }]
        }
    }
};

export default class EventsView extends React.Component {
  constructor(props) {
    super(props);
    const { schema:{ form: {sourceUrl}}} = props;
    this.source = new EventSource(sourceUrl);
    this.chart = null;
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.ctx = document.getElementById("canvas").getContext("2d");
    this.chart = new Chart(this.ctx, config);
    this.source.onmessage = (event) => {
      const data = [...this.state.data];
      data.push(JSON.parse(event.data));
      this.setState({data})
    };
  }
  componentWillUnmount() {
    this.source.close();
  }
  componentDidUpdate() {
    const newEvent = this.state.data.pop();
    config.data.labels.push('');
    config.data.datasets[0].data.push(newEvent.x);
		var diff = config.data.datasets[0].data.length - maxHorizontalValues;
		var removeValueCondition = diff > 0;
		if (removeValueCondition) {
      config.data.labels.splice(0, diff);
      config.data.datasets[0].data.splice(0, diff);
    }
    this.chart.update();
  }
  render() {
    return (
      <div style={{width:'100%'}}>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}
