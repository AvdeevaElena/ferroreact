import { kiln_constants_ru }              from '../../constants/kiln_constants'

// Graph data filler

export function graphCommonRow(kilnLabel, dataGraphRow){


  if (kilnLabel== 'Раиса' || kilnLabel== 'Раиса2') {

  return [
    (kilnLabel==kiln_constants_ru.Раиса)?new Date(dataGraphRow.time):new Date(dataGraphRow.time1), 
    dataGraphRow.oxygen_predict_sp,
    dataGraphRow.analiser_calc,
    dataGraphRow.setpoint, 
    dataGraphRow.average,                           
    dataGraphRow.current_l1,
    dataGraphRow.current_l2,
    dataGraphRow.current_l3,
    dataGraphRow.tc410,
    dataGraphRow.tc411,
    dataGraphRow.tc412,
    dataGraphRow.flap_a_percent_position,
    dataGraphRow.flap_b_percent_position,
    dataGraphRow.flap_c_percent_position,
    dataGraphRow.flap_d_percent_position,
    dataGraphRow.flap_e_percent_position                         
  ] }

  if (kilnLabel==kiln_constants_ru.ФР05) {
    return [
      (kilnLabel==kiln_constants_ru.ФР05)?new Date(dataGraphRow.time):new Date(dataGraphRow.time1), 
      dataGraphRow.temperature,
      dataGraphRow.sp,
      dataGraphRow.output_power                     
    ] }

    if (kilnLabel==kiln_constants_ru.ФР06) {
      return [
        (kilnLabel==kiln_constants_ru.ФР06)?new Date(dataGraphRow.time):new Date(dataGraphRow.time1), 
        dataGraphRow.MV_HEAT,
        dataGraphRow.TEMP_K,
        dataGraphRow.fan_speed                     
      ] }

}