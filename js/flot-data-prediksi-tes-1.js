//Flot Line Chart
$(document).ready(function () {
  console.log("document ready");

  document.getElementById("avgN1").style.display = "none";
  document.getElementById("avgLoop").style.display = "none";
  getHum();
  function getHum() {
    var xNo = new Array();
    var yTemp = new Array();
    var url =
      "http://localhost/rekomendasitindakanternaknila/Raspi06/api/apiGetDataJson_temp.php";
    $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      cache: false,
      success: function (response) {
        for (i = 0; i < response.records.length; i++) {
          xNo[i] = response.records[i].no;
          yTemp[i] = parseInt(response.records[i].temp);
        }
        predictTemp(xNo, yTemp);
      },
    }).fail(function (jqXHR, textStatus, errorThrown) {
      // Request failed. Show error message to user.
      // errorThrown has error message.
      alert("a" + errorThrown);
    });
  }

  function predictTemp(t, y) {
    var options = {
      series: {
        lines: {
          show: true,
        },
        points: {
          show: false,
        },
      },
      grid: {
        hoverable: true, //IMPORTANT! this is needed for tooltip to work
      },
      yaxis: {
        min: 0,
        max: 120,
      },
      tooltip: true,
      tooltipOpts: {
        //content: "'%s' of %x.1 is %y.4",
        shifts: {
          x: -60,
          y: 25,
        },
      },
    };

    var st1 = new Array();
    var st2 = new Array();
    var st3 = new Array();
    var at = new Array();
    var bt = new Array();
    var ct = new Array();
    var ft = new Array();
    var err = new Array();
    var ave = new Array();
    var soe = new Array();
    var avea = new Array();

    var xx = new Array();
    var xy = new Array();
    var yalfa = new Array();
    var mse = new Array();
    var tmpT = new Array();
    var rl = new Array();
    var loop = new Array();
    var aa = 0;
    var bb = 0;
    var sumX = 0;
    var sumY = 0;
    var sumXX = 0;
    var sumXY = 0;
    var sumMSE = 0;

    var lastT = 0;
    console.log("------- Data Asli ---------");

    for (i = 0; i < t.length; i++) {
      console.log(t[i]);
      xx[i] = t[i] * t[i];
      xy[i] = t[i] * y[i];
      sumX = sumX + t[i];
      sumY = sumY + y[i];
      sumXX = sumXX + xx[i];
      sumXY = sumXY + xy[i];
      bb =
        (t[t.length - 1] * sumXY - sumX * sumY) /
        (t[t.length - 1] * sumXX - Math.pow(sumX, 2));
      aa = (sumY - parseFloat(bb) * sumX) / t[t.length - 1];
      lastT = lastT + 1;
    }

    for (let index = 0; index < t.length; index++) {
      yalfa[index] = parseFloat(aa) + parseFloat(bb) * t[index];
      mse[index] = Math.abs(parseFloat(yalfa[index]) - y[index]);
      sumMSE = sumMSE + mse[index];
      var tmpI = t[t.length - 1];
      console.log(tmpI);
      tmpT[index] = tmpI + t[index];
      rl[index] = parseFloat(aa) + parseFloat(bb) * tmpT[index];
      loop[index] = t[index];
    }

    console.log("Last T = " + lastT);
    console.log("------- Data Sum X ---------");
    console.log(sumX);
    console.log("------- Data Sum Y ---------");
    console.log(sumY);
    console.log("------- Data Sum XX --------");
    console.log(sumXX);
    console.log("------- Data Sum XY -------");
    console.log(sumXY);
    console.log("------- Data Sum MSE -------");
    console.log(sumMSE);
    console.log("------- Data Y alfa -------");
    console.log(yalfa);
    console.log("------- Data bb -------");
    console.log(parseFloat(bb));
    console.log("------- Data aa -------");
    console.log(parseFloat(aa));
    console.log("------- Data MSE  ---------");
    console.log(mse);
    console.log("------- Data Regresi Linier  ---------");
    console.log(rl);
    console.log(loop);

    // Plot Ke Chart ------------------------------------
    var dataOri = [];

    for (var i = 0; i < y.length; i++) {
      ny = parseInt(y[i]);
      dataOri.push([i, ny]);
    }

    var plotObj = $.plot(
      $("#flot-line-chart1"),
      [
        {
          data: dataOri,
          label: "data Original",
        },
      ],
      options
    );
    // ------------------------------------------------------------
    console.log("Last T = " + lastT);

    var avgFt = 0;
    for (i = 0; i < rl.length; i++) {
      avgFt = avgFt + rl[i];
    }

    avgFt = avgFt / rl.length;

    var nAve = 0;
    for (i = 0; i < mse.length; i++) {
      nAve = nAve + mse[i];
    }

    yPred = rl;
    console.log(rl);

    var dataLongPredict = [];

    for (i = 0; i < rl.length; i++) {
      newY = parseFloat(rl[i]);
      dataLongPredict.push([i, newY]);
    }

    var plotObj2 = $.plot(
      $("#flot-line-chart2"),
      [
        {
          data: dataLongPredict,
          label: "data Prediksi ",
        },
      ],
      options
    );

    vAve = nAve;
    n = 10;

    console.log("panjang data " + n);
    document.getElementById("avgData1").innerHTML =
      "Mean Square Error : " + vAve / n;
    document.getElementById("avgN1").innerHTML = rl;
    document.getElementById("avgLoop").innerHTML = loop;
    avgLoop;
  }
});
