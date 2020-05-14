 //Flot Line Chart
$(document).ready(function() {
    console.log("document ready");

    document.getElementById("avgN4").style.display = "none";
    var offset = 0;
    getHum();
    function getHum()
    {
      var xNo = new Array();
      var tmpC = new Array();
      var tmpF = new Array();
      var url = "http://apidev.accuweather.com/currentconditions/v1/208971.json?language=en&apikey=hoArfRosT1215";
      $.ajax({   
        type: "GET",   
        url: url,
        dataType: 'json',
        cache: false,
        success: function(response){
            tmpC[0] = response[0].Temperature.Metric.Value;
            tmpF[0] = parseFloat(response[0].Temperature.Imperial.Value);
            console.log(tmpC[0] + " " + tmpF[0]);
            predictHum(xNo, tmpC); 
        }            
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // Request failed. Show error message to user. 
        // errorThrown has error message.
        alert("a" +errorThrown);
      });
    }

  function predictHum(t, y)
  {
    var options = {
        series: {
            lines: {
                show: true
            },
            points: {
                show: false
            }
        },
        grid: {
            hoverable: true //IMPORTANT! this is needed for tooltip to work
        },
        yaxis: {
            min: 0,
            max: 1000
        },
        tooltip: true,
        tooltipOpts: {
            //content: "'%s' of %x.1 is %y.4",
            shifts: {
                x: -60,
                y: 25
            }
        }
    };


    var t2 = new Array();
    var tY = new Array();
    var st1 = new Array();
    var st2 = new Array();
    var st3 = new Array();
    var at = new Array();
    var bt = new Array();
    var ct = new Array();
    var ft = new Array();
    var alpha = 0.143;
    var err = new Array();
    var ave = new Array();
    var soe = new Array();
    var avea = new Array();


    var sumT=0;
    var sumY=0;
    var sumTY=0;
    var sumT2=0;
    var a, b;
    var lastT=0;
    console.log("------- Data Asli ---------")
    console.log(y);


    for(i=0;i<t.length;i++){
      nt = parseInt(t[i]);
      ny = parseInt(y[i]);
      nt2 = parseInt(t[i]);
      ny2 = parseInt(y[i]);
      nyPrev = parseInt(y[i-1]);
     
      
      // if (i>=1)
      // {
        st1[i] = (alpha*ny)+((1-alpha)*nyPrev);
        if (Number.isNaN(st1[i])) {
          st1[i] = 0
        }

        st2[i] = (alpha*st1[i])+((1-alpha)*nyPrev);
        if (Number.isNaN(st2[i])) {
          st2[i] = 0
        }

        st3[i] = (alpha*st2[i])+((1-alpha)*nyPrev);
        if (Number.isNaN(st3[i])) {
          st3[i] = 0
        }

        at[i]  = ((3*st1[i])-(3*st2[i]))+st3[i];
        if (Number.isNaN(at[i])) {
          at[i] = 0
        }

        bt[i]  = (alpha/(2*((1-alpha)*(1-alpha))))*((6-(5*alpha))*st1[i]-(10-(8*alpha))*st2[i]+(4-(3*alpha))*st3[i])
        if (Number.isNaN(bt[i])) {
          bt[i] = 0
        }
        //(alpha/(2*((1-alpha)*(1-alpha))))*(6-(5*alpha))*st1[i]-(1-(8*alpha))*st2[i]+(4-(3*alpha))*st3[i];
        
        ct[i]  = ((alpha*alpha)/((1-alpha)*(1-alpha)))*(st1[i]-2*st2[i]+st3[i]);
        if (Number.isNaN(ct[i])) {
          ct[i] = 0
        }
        //(($T$1^2)/((1-$T$1)^2))*(C3-2*D3+E3)
        
        ft[i]  = at[i]+(bt[i]*1)+(((1/2)*(ct[i]*1))*((1/2)*(ct[i]*1)))
        if (Number.isNaN(ft[i])) {
          ft[i] = 0
        }
        //at+(bt*1)+(((1/2)*(ct*1))*((1/2)*(ct*1)));

        err[i] = y[i]-ft[i];
        if (Number.isNaN(err[i])) {
          err[i] = 0
        }

        ave[i] = Math.abs(ny-ft[i]);
        if (Number.isNaN(ave[i])) {
          ave[i] = 0
        }

        soe[i] = err[i]*err[i];
        if (Number.isNaN(soe[i])) {
          soe[i] = 0
        }

        avea[i] = Math.abs((ny-ft[i])/ny);
        if (Number.isNaN(avea[i])) {
          avea[i] = 0
        }

      // }  
      localStorage.setItem("forecast", ft[i]);

      lastT=lastT+1;      
    }


    console.log("Last T = " +lastT);

    console.log("------- Data Pemulusan Tahap 1 ---------")
    console.log(st1);
    console.log("------- Data Pemulusan Tahap 2 ---------")
    console.log(st2);
    console.log("------- Data Pemulusan Tahap 3 --------")
    console.log(st3);
    console.log("------- Data rata trend -------")
    console.log(at);
    console.log("------- Data trend pemulusan ganda -------")
    console.log(bt);
    console.log("------- Data trend pemulusan triple -------")
    console.log(ct);
    console.log("------- Data Ramalan -------")
    console.log(ft);
    console.log("------- Data Error  ---------")
    console.log(err);
    console.log("---- Absolute Value of Error ----")
    console.log(ave);
    console.log("---- Square of Error ----")
    console.log(soe);
    console.log("---- Absolute Values of Errordivided by Actual Values----")
    console.log(avea);


    // Plot Ke Chart ------------------------------------
    var dataOri = [],
        dataPredict = [];

    for (var i = 0; i < y.length; i++) {
        ny = parseInt(y[i]);
        dataOri.push([i, ny]);  
    }

    for (var i = 0; i < ft.length; i++) {
        pY = parseFloat(ft[i]).toFixed(4);
        console.log('py ' + pY);
        
        //perulangan rumus ramalan
        dataPredict.push([i, pY]);        
    }

    var plotObj = $.plot($("#flot-line-chart7"), [{
            data: dataOri,
            label: "data Original"
        }, {
            data: dataPredict,
            label: "data Prediksi"
        }],
    options);
    // ------------------------------------------------------------
    console.log('Last T = ' +lastT)

    console.log("------- Data Prediksi 90 Hari Kedepan ---------")

    for(var i = 0; i < 83; i++) {
      y[lastT] = ft[lastT - 1]
      var tempY = 0;
      var averageY = 0;
      nt = parseInt(t[lastT - 1]);
      // ny = parseInt(y[lastT - 1]);
      ny = parseFloat(ft[lastT - 1]);
      nt2 = parseInt(t[lastT - 1]);
      ny2 = parseInt(y[lastT - 1]);
      nyPrev = parseFloat(y[(lastT - 1)]);
      
      for (var j = 0; j < y.length; j++) {
        // ny = parseInt(y[j]);
        tempY = tempY + ny;
      }

      averageY = tempY / (lastT + 1);
      
      // if (i>=1)
      // {
        console.log('nyPrev = ' +nyPrev);
        st1[lastT] = (alpha*ny)+((1-alpha)*nyPrev);
        if (Number.isNaN(st1[lastT])) {
          st1[lastT] = 0
        }

        st2[lastT] = (alpha*st1[lastT])+((1-alpha)*nyPrev);
        if (Number.isNaN(st2[lastT])) {
          st2[lastT] = 0
        }

        st3[lastT] = (alpha*st2[lastT])+((1-alpha)*nyPrev);
        if (Number.isNaN(st3[lastT])) {
          st3[lastT] = 0
        }

        at[lastT]  = ((3*st1[lastT])-(3*st2[lastT]))+st3[lastT];
        if (Number.isNaN(at[lastT])) {
          at[lastT] = 0
        }

        bt[lastT]  = (alpha/(2*((1-alpha)*(1-alpha))))*((6-(5*alpha))*st1[lastT]-(10-(8*alpha))*st2[lastT]+(4-(3*alpha))*st3[lastT])
        if (Number.isNaN(bt[lastT])) {
          bt[lastT] = 0
        }
        //(alpha/(2*((1-alpha)*(1-alpha))))*(6-(5*alpha))*st1[i]-(1-(8*alpha))*st2[i]+(4-(3*alpha))*st3[i];
        
        ct[lastT]  = ((alpha*alpha)/((1-alpha)*(1-alpha)))*(st1[lastT]-2*st2[lastT]+st3[lastT]);
        if (Number.isNaN(ct[lastT])) {
          ct[lastT] = 0
        }
        //(($T$1^2)/((1-$T$1)^2))*(C3-2*D3+E3)
        
        ft[lastT]  = at[lastT]+(bt[lastT]*1)+(((1/2)*(ct[lastT]*1))*((1/2)*(ct[lastT]*1)))
        //ft[i]  = at[i]+(bt[i]*1)+(((1/2)*(ct[i]*1))*((1/2)*(ct[i]*1)))
        //ft[lastT]  = averageY;
        if (Number.isNaN(ft[lastT])) {
          ft[lastT] = 0
        }
        //at+(bt*1)+(((1/2)*(ct*1))*((1/2)*(ct*1)));

        err[lastT] = y[lastT]-ft[lastT];
        if (Number.isNaN(err[lastT])) {
          err[lastT] = 0
        }

        ave[lastT] = Math.abs(ny-ft[lastT]);
        if (Number.isNaN(ave[lastT])) {
          ave[lastT] = 0
        }

        soe[lastT] = err[lastT]*err[lastT];
        if (Number.isNaN(soe[lastT])) {
          soe[lastT] = 0
        }

        avea[lastT] = Math.abs((ny-ft[lastT])/ny);
        if (Number.isNaN(avea[lastT])) {
          avea[lastT] = 0
        }

      // }  
      localStorage.setItem("forecast", ft[lastT]);
      console.log('lastT ' + lastT)

      lastT=lastT+1;  
    }

    // var tYNew = new Array();
    // tYNew = ft;
    // var n = 0;
    // var panjang = y.length;
    // for(i=0;i<83;i++){      
    //   var sumY=0;
    //   y[panjang] = localStorage.getItem("forecast");
    //   for(j=0; j<y.length; j++)
    //   {
    //     // ny = parseInt(tYNew[j]); 
    //     ny = parseInt(y[j]); 
    //     sumY = sumY + ny;          
    //   }
    //   // sumY = sumY + parseInt(localStorage.getItem("forecast"));
    //   // sumY = sumY + localStorage.getItem("forecast");
    //   avgY = sumY / (panjang + 1);
    //   // n=n+1; 

    //   // tYNew[y] = avgY;
    //   // tYNew[panjang] = avgY;

    //   st1[panjang] = (alpha*ny)+((1-alpha)*nyPrev);

    //   st2[panjang] = (alpha*st1[panjang])+((1-alpha)*nyPrev);

    //   st3[panjang] = (alpha*st2[panjang])+((1-alpha)*nyPrev);

    //   at[panjang]  = ((3*st1[panjang])-(3*st2[panjang]))+st3[panjang];

    //   bt[panjang]  = (alpha/(2*((1-alpha)*(1-alpha))))*((6-(5*alpha))*st1[panjang]-(10-(8*alpha))*st2[panjang]+(4-(3*alpha))*st3[panjang])
    //   //(alpha/(2*((1-alpha)*(1-alpha))))*(6-(5*alpha))*st1[i]-(1-(8*alpha))*st2[i]+(4-(3*alpha))*st3[i];
      
    //   ct[panjang]  = ((alpha*alpha)/((1-alpha)*(1-alpha)))*(st1[panjang]-2*st2[panjang]+st3[panjang]);
    //   // ((st1^2)/((1-st1)^2))*(C3-2*D3+E3)
      
    //   // ft[panjang]  = at[panjang]+(bt[panjang]*1)+(((1/2)*(ct[panjang]*1))*((1/2)*(ct[panjang]*1)))
    //   ft[panjang]  = avgY;
    //   //at+(bt*1)+(((1/2)*(ct*1))*((1/2)*(ct*1)));

    //   // err[panjang] = y[panjang]-ft[panjang];
    //   err[panjang] = y[panjang]-ft[panjang];

    //   ave[panjang] = ny-ft[panjang];

    //   soe[panjang] = err[panjang]*err[panjang];

    //   avea[panjang] = Math.abs((ny-ft[panjang])/ny);

    // // }  
    //   localStorage.setItem("forecast", ft[panjang]);

    //   panjang++;

    //   //tYNew.push(avgY); 
    // }    

    // for(x = 0; x < ft.length; x++) {
    //   console.log('isi suhu ' + ft[x])   
    // }
    // console.log("------- Data Y Baru  ---------")
    // console.log(ft);

    // for(k=t.length;k<ft.length;k++)
    // { 
    //   // nyPrev = parseInt(tYNew[k]);
    //   nyPrev = ft[k];
    //   ft[k] = at+(bt*1)+(((1/2)*(ct*1))*((1/2)*(ct*1)));
    //   err[k] = ny-ft[k];
    // }

    console.log("------- Data Y ( Ramalan, Error)  ---------")
    console.log(ft);
    console.log(err);

    var avgFt = 0
    for(i=0;i<ft.length;i++)
    {
      avgFt = avgFt + ft[i];
      console.log(avgFt);
    }
    
    avgFt = avgFt / ft.length;
    console.log("------- Rata-Rata Ft  ---------")
    console.log(avgFt);
    

    var nAve = 0
    for(i=0;i<ave.length;i++)
    {
      console.log('aveee ' + ave[i])
      nAve = nAve + ave[i];
    }
    console.log("------- SUM Absolute Values of Error ---------")
    console.log(nAve);

    var nAvea = 0
    for(i=0;i<avea.length;i++)
    {
      console.log('aveaaa ' + avea[i])
      nAvea = nAvea + avea[i];
    }
    console.log("------- SUM Absolute Values of Errordivided by Actual Values  ---------")
    console.log(nAvea);
    console.log("------- Y Prediksi  ---------")
    yPred = avgFt;
    yPred = yPred;
    console.log(yPred);


    var dataLongPredict = [];
    
    for(i=t.length; i < ft.length; i++)
    {
      newY = parseFloat(ft[i]);
      console.log(newY);      
      dataLongPredict.push([i, newY]);
    }

    var plotObj2 = $.plot($("#flot-line-chart8"), [{
            data: dataLongPredict,
            label: "data Prediksi " 
        }],
    options);

    vAve = nAve;
    vAvea = nAvea;
    n = 90;

    console.log('panjang data ' + n)
    document.getElementById('avgData7').innerHTML = "Mean Square Error : " +vAve/n;
    document.getElementById('avgData8').innerHTML = "Mean Absolute Percentage Error : " +(vAvea/n)*100;
    document.getElementById('avgN4').innerHTML = yPred;
  }  
});