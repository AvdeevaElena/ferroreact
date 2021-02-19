import React                                from 'react';
import Chart                                from 'react-google-charts';
import GraphFR05                           from '../graphs/GraphFR05';
import                                           './info.css';
import                                           '../style.css';
import logo_loading                         from '../../logos/fp_logo_loading.svg';
import { connect }                          from 'react-redux';
import { RequestTimelineData }              from '../receivers/requestData'
import { TimelineColumns, TableColumnsFR05 }    from '../receivers/handleDataResponse';
//import TwoTablesFR05                             from '../twoTables/TwoTablesFR05       ';
import { burn_graph_number_received,
         burn_two_tables_number_received}   from '../../actions/aux_data_receiving_actions';
import { kiln_constants_ru,
         kiln_constants_en }                from '../../constants/kiln_constants'


export class InfoFR05        extends React.Component{
  constructor(props) {
    super(props);
  }

  requestData(){
    const AuthStr =JSON.parse(localStorage.getItem('currentUser'));

    RequestTimelineData(kiln_constants_ru.ФР05, 'http://172.16.20.75:8060/?generaltimeline=' + kiln_constants_en.ФР05, AuthStr)
    .then(resultArrayTwoDataPresets=>{
      this.setState({dataTimeLine:  resultArrayTwoDataPresets.rowsTimeLine});
      this.setState({dataTable:     resultArrayTwoDataPresets.rowsTable});
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
      this.props.dispatch(burn_graph_number_received(kiln_constants_ru.ФР05, parseInt(selectedTimelineValue))); 
    }
  }];
      
  chartEventsTable =[{
    eventName: 'select',
    callback  : ({chartWrapper}) => { 
      var selection =               chartWrapper.getChart().getSelection();
      var selectedTableValue =      chartWrapper.getDataTable().getValue(selection[0].row,1); 
      this.props.dispatch(burn_two_tables_number_received(kiln_constants_ru.ФР05, parseInt(selectedTableValue))); 
    }
  }];

  render(){
    return (
      <div className={'my-global-div'} >

        <div id='table' className={'my-table-div'}>
          { this.state && this.state.dataTable &&
            <Chart
              chartType='Table'
              chartLanguage = 'ru'
              rows={this.state.dataTable}
              columns={TableColumnsFR05}         
              width='1200px'
              height='100%'
              options={{
                showRowNumber: true,
                allowHtml: true, 
                width:'100%'
              }}  
              chartEvents={this.chartEventsTable}
            />
          }
        </div> 

        <div id='timeline' className={'my-timeline-div-info-raisa'}>
          { this.state && this.state.dataTimeLine &&
            <Chart
              chartType='Timeline'
              chartLanguage = 'ru'
              rows={this.state.dataTimeLine}
              columns={TimelineColumns}
              width='1200px'
              height='100px'
              options={{
                width:'100%'
              }}    
              chartEvents={this.chartEventsTimeline}          
            />
          }
        </div>
        
        {(!this.state || !this.state.dataTimeLine || !this.state.dataTable)  &&
          <div className='logoWidth'>
            <div>
              <p >Загружаем...</p>
              <img src={logo_loading} className="App-logo-loading" alt="waiting" />
            </div>
          </div>
        }
        
        <div id='graph' className={'my-graphFR05-div'}>
          { this.state && this.state.dataTimeLine && this.props.aux_data_received &&this.props.aux_data_received.number && !this.props.aux_data_received.two_tables_number &&
            <GraphFR05 programNumber={this.props.aux_data_received.number}/> 
          }
        </div>
  
      </div>
    );
  }
}

const mapStateToProps = state => ({
  aux_data_received: state.aux_data_received.filter(c => c.kiln==kiln_constants_ru.ФР05)[0]
}) 

const mapDispatchToProps = dispatch => ({
  dispatch(params){
    dispatch(params);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoFR05);