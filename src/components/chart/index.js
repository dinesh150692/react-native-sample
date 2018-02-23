import React, {
	Component,
} from 'react';
import {
	WebView,
	Platform,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
/**
 * 渲染图表脚本的模版，设置时将CONFIG参数替换成对应的值
 * @type {[string]}
 */
var settingChartScript = `
	var pinID = 0;
	Chart.defaults.global.defaultFontSize={DEFAULT_FONT_SIZE};
	Chart.defaults.global.defaultFontColor = '#000000';
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart( ctx, {CONFIG});
	ctx = document.getElementById("myChart");
	ctx.onclick = function(evt) {
		var activePoint = myChart.getElementAtEvent(evt)[0];
		if(activePoint){
			document.title  =  activePoint._index;
			window.location.hash = pinID++;
		  	return false;
	  	}
	};
`;

export default class Chart extends Component {
	
	static propTypes = {
		/**
		 * 图表配置参数，对应chart.js中初始化需要的参数
		 * @type {[object]}
		 */
		chartConfiguration: PropTypes.object.isRequired,
		defaultFontSize : PropTypes.number
	}
	constructor(props) {
		super(props);
		this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if( nextProps.chartConfiguration !== this.props.chartConfiguration
			|| nextProps.defaultFontSize !== this.props.defaultFontSize ){
			this.setChart(nextProps.chartConfiguration, nextProps.defaultFontSize );
		}
	}
	setChart(chartConfiguration, defaultFontSize) {
		if( !chartConfiguration || undefined == defaultFontSize || null == defaultFontSize ){
			return ;
		}
		this.webview && this.webview.injectJavaScript( 
			settingChartScript.replace('{CONFIG}', JSON.stringify( chartConfiguration ))
				.replace('{DEFAULT_FONT_SIZE}', defaultFontSize )
		);
	}
	onNavigationStateChange(navState) {
		if(navState.title){
			this.props.updateActiveLabel(navState.title);
		}
	}

	render() {
		const defaultFontSize = this.props.defaultFontSize ? this.props.defaultFontSize : responsiveHeight(2.3);
		return ( <WebView style={{ flex : 1, height: responsiveHeight(30), width: responsiveWidth(100) }}
					ref = {
						ref => this.webview = ref
					}
					injectedJavaScript = {
						settingChartScript.replace( '{CONFIG}', JSON.stringify( this.props.chartConfiguration ))
							.replace('{DEFAULT_FONT_SIZE}', defaultFontSize )
					}
					source = {
						require('./dist/index.html')
					}
					
					onError = {
						(error) => {
							console.log(error)
						}
					}
					onNavigationStateChange={this.onNavigationStateChange}
					automaticallyAdjustContentInsets = {true}
					scalesPageToFit = { true }
					startInLoadingState = {true}
				/>	
		)
	}
}



// import React, {
// 	Component,
// } from 'react';
// import {
// 	Alert,
// 	View,
// 	WebView,
// 	StyleSheet
// } from 'react-native';
// import {
//     responsiveWidth,
// 	responsiveHeight,
// 	responsiveFontSize
// } from 'react-native-responsive-dimensions';


// var settingChartScript = `
// 	var pinID = 0;
// 	Chart.defaults.global.defaultFontSize={DEFAULT_FONT_SIZE};
// 	Chart.defaults.global.defaultFontColor = '#000000';
// 	var ctx = document.getElementById("myChart").getContext('2d');
// 	var chartData = {CONFIG};
// 	var config = {
// 		type: 'bar',
// 		data: chartData,
// 		options: {
// 			responsive: true,
// 			events: false,
// 			tooltips: {
// 				enabled: false
// 			},
// 			hover: {
// 				animationDuration: 0
// 			},
// 			scales: {
// 				xAxes : [{
// 					display: true,
//                 	gridLines: {
// 						lineWidth: 0,
//                 		display: false,
//             		}  
//             	}],
//                 yAxes: [{
//                     // stacked:true,
// 					display:false,
// 					gridLines: {
//                         lineWidth: 0,
// 						display: false,
// 					},
//                     ticks: {
// 						beginAtZero: true
// 					}
//                 }]
//             },
//             legend: {                    
// 				display: true,
//                 labels :{
//                     boxWidth: 0,
//                 }
// 			},
// 			animation: {
// 				duration: 1,
// 				onComplete: function () {
// 					var chartInstance = this.chart,
// 					ctx = chartInstance.ctx;
// 					Chart.defaults.global.defaultFontColor = '#000000';
// 					ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
// 					ctx.textAlign = 'center';
// 					ctx.textBaseline = 'bottom';
// 					this.data.datasets.forEach(function (dataset, i) {
// 						var meta = chartInstance.controller.getDatasetMeta(i);
// 						meta.data.forEach(function (bar, index) {
// 							var data = dataset.data[index];                            
// 							ctx.fillText(data, bar._model.x, bar._model.y);
// 						});
// 					});			
// 				}
// 			}
// 		}
// 	};		
// 	var myChart = new Chart( ctx, config );
// 	ctx = document.getElementById("myChart");
// 	ctx.onclick = function(evt) {
// 		var activePoint = myChart.getElementAtEvent(evt)[0];
// 		if(activePoint){
// 			document.title  =  activePoint._index;
// 			window.location.hash = pinID++;
// 		  	return false;
// 	  	}
// 	};
// `;

// export default class Chart extends Component {
	
// 	constructor(props) {
// 		super(props);
// 		this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
// 		console.log(this.props.chartConfiguration);
// 	}

// 	componentWillReceiveProps(nextProps) {
// 		if( nextProps.chartConfiguration !== this.props.chartConfiguration
// 			|| nextProps.defaultFontSize !== this.props.defaultFontSize ){
// 			this.setChart(nextProps.chartConfiguration, nextProps.defaultFontSize );
// 		}
// 	}

// 	setChart(chartConfiguration, defaultFontSize) {
// 		if( !chartConfiguration || undefined == defaultFontSize || null == defaultFontSize ){
// 			return ;
// 		}
// 		this.webview && this.webview.injectJavaScript( 
// 			settingChartScript.replace('{CONFIG}', JSON.stringify( chartConfiguration ))
// 				.replace('{DEFAULT_FONT_SIZE}', defaultFontSize )
// 		);
// 	}
	
// 	onNavigationStateChange(navState) {
// 		if(navState.title){
// 			this.props.callback(navState.title);
// 		}
// 	}
	
// 	render() {
// 		const defaultFontSize = this.props.defaultFontSize ? this.props.defaultFontSize : responsiveHeight(2.1);
// 		return (<WebView style={{ flex : 1, height: responsiveHeight(30) }}
// 					ref = {
// 						ref => this.webview = ref
// 					}
// 					automaticallyAdjustContentInsets = {true}
// 					javaScriptEnabled={true}
// 					injectedJavaScript = {
// 						settingChartScript.replace( '{CONFIG}', JSON.stringify( this.props.chartConfiguration ))
// 							.replace('{DEFAULT_FONT_SIZE}', defaultFontSize )
// 					}
// 					source = {
// 						require('./dist/index.html')
// 					}
// 					onError = {
// 						(error) => {
// 							console.log(error)
// 						}
// 					}
// 					onNavigationStateChange={this.onNavigationStateChange}
// 					scalesPageToFit = { false }
// 				/>	
// 		)
// 	}
// }
