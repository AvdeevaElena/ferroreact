import React                              from 'react';
import Chart                              from 'react-google-charts';
import                                         './GeneralTimeLine.css';
import logo_loading                       from '../../logos/fp_logo_loading.svg';
import { RequestTimelineData }            from '../receivers/requestData';
import { TimelineColumns }                from '../receivers/handleDataResponse';
import { connect }                        from 'react-redux';
import { burn_graph_number_received, go_baby_go }     from '../../actions/aux_data_receiving_actions';
import { kiln_constants_ru,
         kiln_constants_en }              from '../../constants/kiln_constants'

import InfoFR05                           from '../infos/InfoFR05';  
import InfoFR06                           from '../infos/InfoFR06';    
import InfoRaisa2                           from '../infos/InfoRaisa2';    
import InfoRaisa                           from '../infos/InfoRaisa';           
/*
 Main entry point of appliation.
 Shows short visualisation of all burns.
 Add in future event on select custom program to show graph.
 in future delete ability so select start, stop sections on timeline
*/

export class GeneralTimeLine extends React.Component{

  constructor(props) {
    super(props);
  }

  requestData(){
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));
     
    RequestTimelineData(kiln_constants_ru.Раиса, 'http://172.16.20.75:8060/?generaltimeline=' + kiln_constants_en.Раиса, AuthStr).then(resultArrayTwoDataPresets=>{
      this.setState({dateTimeLineRaisa: resultArrayTwoDataPresets.rowsTimeLine});
      this.props.dispatch(burn_graph_number_received('Раиса', Math.max.apply(Math, resultArrayTwoDataPresets.rowsTimeLine.map(function(row){return row.slice(1,2)}))));
    });   
    RequestTimelineData(kiln_constants_ru.Раиса2, 'http://172.16.20.75:8060/?generaltimeline=' + kiln_constants_en.Раиса2, AuthStr).then(resultArrayTwoDataPresets=>{
      this.setState({dateTimeLineRaisa2: resultArrayTwoDataPresets.rowsTimeLine});
      this.props.dispatch(burn_graph_number_received('Раиса2', Math.max.apply(Math, resultArrayTwoDataPresets.rowsTimeLine.map(function(row){return row.slice(1,2)}))));
    });
    RequestTimelineData(kiln_constants_ru.ФР05, 'http://172.16.20.75:8060/?generaltimeline=' + kiln_constants_en.ФР05, AuthStr).then(resultArrayTwoDataPresets=>{
      this.setState({dateTimeLineFR05: resultArrayTwoDataPresets.rowsTimeLine});
      this.props.dispatch(burn_graph_number_received('ФР05', Math.max.apply(Math, resultArrayTwoDataPresets.rowsTimeLine.map(function(row){return row.slice(1,2)}))));
    });
    RequestTimelineData(kiln_constants_ru.ФР06, 'http://172.16.20.75:8060/?generaltimeline=' + kiln_constants_en.ФР06, AuthStr).then(resultArrayTwoDataPresets=>{
      this.setState({dateTimeLineFR06: resultArrayTwoDataPresets.rowsTimeLine});
      this.props.dispatch(burn_graph_number_received('ФР06', Math.max.apply(Math, resultArrayTwoDataPresets.rowsTimeLine.map(function(row){return row.slice(1,2)}))));
    });



  }

  componentDidMount() {
    this.requestData();  
  }

  chartEventsTimeline =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => {        
      var selection =               chartWrapper.getChart().getSelection();
      var selectedTimelineValue =   chartWrapper.getDataTable().getValue(selection[0].row,1);  
      var selectedTimelineKlinName =   chartWrapper.getDataTable().getValue(selection[0].row,0);  
      
      this.props.dispatch(go_baby_go(selectedTimelineKlinName,  parseInt(selectedTimelineValue))); 
    }
  }];

  render(){
    return (
      <div className={"my-global-div"} >
        <div className={"my-timeline-div"}>
          { this.state && this.state.dateTimeLineRaisa && this.state.dateTimeLineRaisa2 && this.state.dateTimeLineFR05 && this.state.dateTimeLineFR06 &&
            <Chart
              chartType="Timeline"
              chartLanguage = 'ru'
              rows={[...this.state.dateTimeLineRaisa, ...this.state.dateTimeLineRaisa2, ...this.state.dateTimeLineFR05, ...this.state.dateTimeLineFR06]}
              columns={TimelineColumns}
              width="1200px"
              height="250px"
              options={{
                width:"100%"
              }}
              chartEvents={this.chartEventsTimeline}     
            />
          }
        </div>
        {this.state &&(
          !this.state.dateTimeLineRaisa || !this.state.dateTimeLineRaisa2 || !this.state.dateTimeLineFR05 || !this.state.dateTimeLineFR06) &&
            <div>
              <p >Загружаем...</p>
              <img src={logo_loading} className="App-logo-loading" alt="waiting" />
              {/*<LoadingLogo fillcolor='#444444' width_pt='82pt' height_pt='82pt'/>*/}
            </div>
        }
        { 
          
          this.props.aux_data_received &&  ( this.props.aux_data_received.kiln === 'Раиса'  || this.props.aux_data_received.kiln === 'Raisa')&&
          <div>
          <InfoRaisa />
          </div>
        }

        { 
          this.props.aux_data_received &&  (this.props.aux_data_received.kiln === 'Раиса2' || this.props.aux_data_received.kiln === 'Raisa') &&
          <div>
          <InfoRaisa2 />
          </div>
        }
      
      
        { 
          this.props.aux_data_received &&  (this.props.aux_data_received.kiln === 'ФР06' || this.props.aux_data_received.kiln === 'FR06') &&
          <div>
          <InfoFR06 />
          </div>
        }

        
        {         
          this.props.aux_data_received &&  (this.props.aux_data_received.kiln === 'ФР05' || this.props.aux_data_received.kiln === 'FR05') &&
          <div>
          <InfoFR05 />
          </div>
        }


        <div className={"my-text-div"}>
          <p > <a href = "mailto:b.smirnov@rusgates.ru; e.avdeeva@rusgates.ru"> Служба тех. поддержки </a> </p>  
          <p > © АО "Ферроприбор" </p>   
        </div> 
      </div>
    );
  }
}

const mapStateToProps = state => ({
  aux_data_received: state.aux_data_received[0]
}) 

const mapDispatchToProps = dispatch => ({
  dispatch(params){
    dispatch(params);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneralTimeLine);