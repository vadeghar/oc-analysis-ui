/* globals Chart:false, feather:false */
var niftyChartOiDayChangeData=[];
var niftyChartOiNetChangeData=[];
var niftyChartLabels=[];

var niftyPeChartOiDayChangeData=[];
var niftyPeChartOiNetChangeData=[];
var niftyPeChartLabels=[];

var bankNiftyChartOiDayChangeData=[];
var bankNiftyChartOiNetChangeData=[];
var bankNiftyChartLabels=[];

var bankNiftyPeChartOiDayChangeData=[];
var bankNiftyPeChartOiNetChangeData=[];
var bankNiftyPeChartLabels=[];

var ctx = document.getElementById('niftyChart');
var niftyPeChartCtx = document.getElementById('niftyPeChart');
var ctx2 = document.getElementById('bankNiftyChart');
var bankNiftyPeChartCtx = document.getElementById('bankNiftyPeChart');
  // eslint-disable-next-line no-unused-vars
  var niftyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        data: [],
        label: "Total Change in OI",
        backgroundColor: getRandomColorHex(),
        borderWidth: 1,
        pointBorderWidth: 1,
        pointHoverRadius: 7

      },
      {
        data: [],
        label: "Change in OI from last refresh",
        backgroundColor: getRandomColorHex(),
        borderWidth: 1,
        pointBorderWidth: 1,
        pointHoverRadius: 7
      }]
    },
    options: {
         responsive: true, // Instruct chart js to respond nicely.
         maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
         elements: {
             point:{
                 radius: 0
             }
         },
         plugins: {
          zoom: {
              zoom: {
                wheel: {
                  enabled: true // SET SCROOL ZOOM TO TRUE
                },
                mode: "xy",
                speed: 100,
                onZoomComplete({chart}) {
                  // This update is needed to display up to date zoom level in the title.
                  // Without this, previous zoom level is displayed.
                  // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                  chart.update('none');
                }
              },
              pan: {
                enabled: true,
                mode: "xy",
                speed: 100
              }
            }
        }
    }
  });

  var niftyPeChart = new Chart(niftyPeChartCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "Total Change in OI",
          backgroundColor: getRandomColorHex(),
          borderWidth: 1,
          pointBorderWidth: 1,
          pointHoverRadius: 7

        },
        {
            data: [],
            label: "Change in OI from last refresh",
            backgroundColor: getRandomColorHex(),
            borderWidth: 1,
            pointBorderWidth: 1,
            pointHoverRadius: 7
          }]
      },
      options: {
           responsive: true, // Instruct chart js to respond nicely.
           maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
           elements: {
               point:{
                   radius: 0
               }
           },
           plugins: {
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true // SET SCROOL ZOOM TO TRUE
                  },
                  mode: "xy",
                  speed: 100,
                  onZoomComplete({chart}) {
                    // This update is needed to display up to date zoom level in the title.
                    // Without this, previous zoom level is displayed.
                    // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                    chart.update('none');
                  }
                },
                pan: {
                  enabled: true,
                  mode: "xy",
                  speed: 100
                }
              }
          }
      }
    });

  var bankNiftyChart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "Total Change in OI",
          backgroundColor: getRandomColorHex(),
          borderWidth: 1,
          pointBorderWidth: 1,
          pointHoverRadius: 7
        },
        {
            data: [],
            label: "Change in OI from last refresh",
            backgroundColor: getRandomColorHex(),
            borderWidth: 1,
            pointBorderWidth: 1,
            pointHoverRadius: 7
          }]
      },
      options: {
           responsive: true, // Instruct chart js to respond nicely.
           maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
           elements: {
               point:{
                   radius: 0
               }
           },
           plugins: {
            zoom: {
                zoom: {
                  wheel: {
                    enabled: true // SET SCROOL ZOOM TO TRUE
                  },
                  mode: "xy",
                  speed: 100,
                  onZoomComplete({chart}) {
                    // This update is needed to display up to date zoom level in the title.
                    // Without this, previous zoom level is displayed.
                    // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                    chart.update('none');
                  }
                },
                pan: {
                  enabled: true,
                  mode: "xy",
                  speed: 100
                }
              }
          }
      }
    });

    var bankNiftyPeChart = new Chart(bankNiftyPeChartCtx, {
          type: 'bar',
          data: {
            labels: [],
            datasets: [{
              data: [],
              label: "Total Change in OI",
              backgroundColor: getRandomColorHex(),
              borderWidth: 1,
              pointBorderWidth: 1,
              pointHoverRadius: 7

            },
            {
                data: [],
                label: "Change in OI from last refresh",
                backgroundColor: getRandomColorHex(),
                borderWidth: 1,
                pointBorderWidth: 1,
                pointHoverRadius: 7
              }]
          },
          options: {
               responsive: true, // Instruct chart js to respond nicely.
               maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
               elements: {
                   point:{
                       radius: 0
                   }
               },
               plugins: {
                zoom: {
                    zoom: {
                      wheel: {
                        enabled: true // SET SCROOL ZOOM TO TRUE
                      },
                      mode: "xy",
                      speed: 100,
                      onZoomComplete({chart}) {
                        // This update is needed to display up to date zoom level in the title.
                        // Without this, previous zoom level is displayed.
                        // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
                        chart.update('none');
                      }
                    },
                    pan: {
                      enabled: true,
                      mode: "xy",
                      speed: 100
                    }
                  }
              }
          }
        });



function loadChartData() {
    $.ajax('/nifty/refresh', {
        dataType: 'json', // type of response data
        timeout: 15000,     // timeout milliseconds
        success: function (data,status,xhr) {   // success callback function
            $.each(data.niftyCeList, function(i, item) {
                if(i <=6) {
                    //console.log('Index: '+i+" strike: "+item.strikePrice);
                    niftyChartLabels.push(item.strikePrice+"CE");
                    niftyChartOiDayChangeData.push(item.changeInOi);
                    niftyChartOiNetChangeData.push(item.curChangeInOi);
                }
            });
            $.each(data.niftyPeList, function(i, item) {
                if(i <=6) {
//                    console.log('Index: '+i+" strike: "+item.strikePrice);
                    niftyPeChartLabels.push(item.strikePrice+"PE");
                    niftyPeChartOiDayChangeData.push(item.changeInOi);
                    niftyPeChartOiNetChangeData.push(item.curChangeInOi);
                }
            });
            $('#niftySpotPrice').text(data.niftySpotPrice);
        },
        error: function (jqXhr, textStatus, errorMessage) { // error callback
            alert('Error: ' + errorMessage);
        },
        complete: function (data) {
            niftyChart.data.labels = niftyChartLabels;
            niftyChart.data.datasets[0].data = niftyChartOiDayChangeData; // or you can iterate for multiple datasets
            niftyChart.data.datasets[1].data = niftyChartOiNetChangeData;
            niftyChart.update(); // finally update our chart

            niftyPeChart.data.labels = niftyPeChartLabels.reverse();
            niftyPeChart.data.datasets[0].data = niftyPeChartOiDayChangeData.reverse(); // or you can iterate for multiple datasets
            niftyPeChart.data.datasets[1].data = niftyPeChartOiNetChangeData.reverse();
            niftyPeChart.update();
         }
    });

    $.ajax('/bank/refresh', {
            dataType: 'json', // type of response data
            timeout: 15000,     // timeout milliseconds
            success: function (data,status,xhr) {   // success callback function
                $.each(data.bankNiftyCeList, function(i, item) {
                    if(i <=6) {
                        console.log('Index: '+i+" strike: "+item.strikePrice);
                        bankNiftyChartLabels.push(item.strikePrice+"CE");
                        bankNiftyChartOiDayChangeData.push(item.changeInOi);
                        bankNiftyChartOiNetChangeData.push(item.netChangeInOi);
                    }
                });
                $.each(data.bankNiftyPeList, function(i, item) {
                    if(i <=6) {
                        console.log('Index: '+i+" strike: "+item.strikePrice);
                        bankNiftyPeChartLabels.push(item.strikePrice+"PE");
                        bankNiftyPeChartOiDayChangeData.push(item.changeInOi);
                        bankNiftyPeChartOiNetChangeData.push(item.netChangeInOi);
                    }
                });
                $('#bankNiftySpotPrice').text(data.bankNiftySpotPrice);
            },
            error: function (jqXhr, textStatus, errorMessage) { // error callback
                alert('Error: ' + errorMessage);
            },
            complete: function (data) {
                bankNiftyChart.data.labels = bankNiftyChartLabels;
                bankNiftyChart.data.datasets[0].data = bankNiftyChartOiDayChangeData; // or you can iterate for multiple datasets
                bankNiftyChart.data.datasets[1].data = bankNiftyChartOiNetChangeData;
                bankNiftyChart.update(); // finally update our chart

                bankNiftyPeChart.data.labels = bankNiftyPeChartLabels.reverse();;
                bankNiftyPeChart.data.datasets[0].data = bankNiftyPeChartOiDayChangeData.reverse();; // or you can iterate for multiple datasets
                bankNiftyPeChart.data.datasets[1].data = bankNiftyPeChartOiNetChangeData.reverse();
                bankNiftyPeChart.update(); // finally update our chart
             }
        });





}

$(document).ready(function () {
    applyDataTable();
    loadChartData(niftyChart, niftyPeChart);
});

$(".refresh").on('click', function(){
   niftyChartOiDayChangeData=[];
   niftyChartOiNetChangeData=[];
   niftyChartLabels=[];

   niftyPeChartOiDayChangeData=[];
   niftyPeChartOiNetChangeData=[];
   niftyPeChartLabels=[];

   bankNiftyChartOiDayChangeData=[];
   bankNiftyChartOiNetChangeData=[];
   bankNiftyChartLabels=[];

   bankNiftyPeChartOiDayChangeData=[];
   bankNiftyPeChartOiNetChangeData=[];
   bankNiftyPeChartLabels=[];

   loadChartData();
});

function getRandomColorHex() {
   var hex = "0123456789ABCDEF",
       color = "#";
   for (var i = 1; i <= 6; i++) {
     color += hex[Math.floor(Math.random() * 16)];
   }
   return color;
}