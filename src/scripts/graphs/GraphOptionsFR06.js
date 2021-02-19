export const graphOptionsFR06={
    explorer: {
      actions: ['dragToZoom', 'rightClickToReset'],
      keepInBounds: true,maxZoomIn: 8.0},
      series:{0: {targetAxisIndex: 0},
              1: {targetAxisIndex: 0},
              2: {targetAxisIndex: 0},
              3: {targetAxisIndex: 0},
              },
              hAxis: {
                  title: 'Время, каждые 5 мин',
                  textStyle: {fontSize: 10},
                  gridlines: {
                      count: -1,
                      units: {
                          days: {format: ['MMM dd']},
                          hours: {format: ['HH:mm', 'ha']},
                      }
                  },
                  minorGridlines: {
                      units: {
                          hours: {format: ['HH:mm', 'ha']},
                          minutes: {format: ['HH:mm', ':mm']}
                      }
                  },
              },
              vAxes: {
                  0: {
                      title: 'Температура, °С',
                      gridlines: {color: '#dadada'},
                      textStyle: {color: '#343434'}
                  },
              },
              legend: { 			position: 'bottom',
                  textStyle: {color: 'blue', fontSize: 12} 
              },
              chartArea:{left:100,top:50,width:'85%',height:'85%'},
              vAxis: {format: '####'}
  }