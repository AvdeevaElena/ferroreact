import moment from 'moment';

// Table filler

export function tableCommonDataTracker (kilntype, dataTableRow) {


  if ( kilntype == 'Раиса' || kilntype== 'Раиса2') {
  return [
    moment(dataTableRow.STARTUP_TIME).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
    dataTableRow.PROGRAM_NUMBER,
    dataTableRow.PROGRAM_NAME,
    moment(dataTableRow.end_time).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
    dataTableRow.duration,
    dataTableRow.waterQuant,
    dataTableRow.powerVAh,
    dataTableRow.powerkWh    
  ]  }
  
  if ( kilntype== 'ФР06' ) {
    return [
      moment(dataTableRow.STARTUP_TIME).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
      dataTableRow.PROGRAM_NUMBER,
      dataTableRow.PROGRAM_NAME,
      moment(dataTableRow.end_time).locale("ru").format("YYYY  Do MMMM, h:mm:ss")
    
    ]  }

    if ( kilntype== 'ФР05' ) {
      return [
        moment(dataTableRow.STARTUP_TIME).locale("ru").format("YYYY  Do MMMM, h:mm:ss"),
        dataTableRow.PROGRAM_NUMBER,
        moment(dataTableRow.end_time).locale("ru").format("YYYY  Do MMMM, h:mm:ss")
      
      ]  }


}