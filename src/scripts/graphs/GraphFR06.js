import   React                                              from 'react';
import   Chart                                              from 'react-google-charts';
import                                                           '../style.css';
import { connect }                                          from 'react-redux';
import { RequestGraphData }                                 from '../receivers/requestData';
import { graphOptionsFR06 }                                from './GraphOptionsFR06'
import { kiln_constants_ru,
         kiln_constants_en }                                from '../../constants/kiln_constants'


// Graph
export class GraphFR06 extends React.Component {
        
  requestData(dataToRequest){

    console.log ('dataToRequest',dataToRequest);
     
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

   console.log ('RequestGraphData',RequestGraphData(kiln_constants_ru.ФР06, 'http://172.16.20.75:8060/?graph=' + kiln_constants_en.ФР06 + '&program_number=' + dataToRequest + '&year=' + new Date().getFullYear(), AuthStr));
    

    RequestGraphData(kiln_constants_ru.ФР06, 'http://172.16.20.75:8060/?graph=' + kiln_constants_en.ФР06 + '&program_number=' + dataToRequest + '&year=' + new Date().getFullYear(), AuthStr).then(resultArrayTablePresets=>{
     
      console.log ("resultArrayTablePresets ФР06", resultArrayTablePresets); 
    this.setState({dataAll:         resultArrayTablePresets.chartDataAll}); 
    
    });      
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.programNumber !== nextProps.programNumber) {
      this.requestData(nextProps.programNumber);
    }
  }

  componentDidMount() {
    this.requestData(this.props.programNumber);
  }

  render() {

    return (
      <div className="GraphPage">    
        <div id="artical" style={{'text-align':'left'}}>     
          <span className='hr5'>Обжиг N {this.props.programNumber} </span>
        </div> 
        <div className="Graph" id="chart_div">
        {this.state && this.state.dataAll &&<Chart
           
            width={1200}
            height={500}
            chartType="LineChart"
            chartLanguage = 'ru'
            loader={<div>Загружаем данные...</div>}
            data={this.state.dataAll}         
            legend_toggle={true}
             options= {graphOptionsFR06}  
          />}
        </div>
              
      </div>
    );
  }
}

const mapStateToProps = state => ({
  graph_mode_selection: state.graph_mode_selection,
}) 
 
export default connect(mapStateToProps)(GraphFR06);