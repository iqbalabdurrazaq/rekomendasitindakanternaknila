//Flot Line Chart
$(document).ready(function () {
  console.log("document ready");
  var offset = 0;
  getHum();
  function getHum() {
    var xNo = new Array();
    var yHum = new Array();
    var url =
      "http://31.220.48.158/projects/iotgateway/raspi02/ms02/apiGetDataJsonMongodb_hum.php";
    $.ajax({
      url: url,
      dataType: "json",
      cache: false,
      success: function (msg) {
        for (i = 0; i < msg.records.length; i++) {
          xNo[i] = msg.records[i].no;
          yHum[i] = parseInt(msg.records[i].hum);
        }
        predictHum(xNo, yHum);
      },
    }).fail(function (jqXHR, textStatus, errorThrown) {
      // Request failed. Show error message to user.
      // errorThrown has error message.
      alert("a" + errorThrown);
    });
  }

  function predictHum(t, y) {
    var t2 = new Array();
    var tY = new Array();
    var sumT = 0;
    var sumY = 0;
    var sumTY = 0;
    var sumT2 = 0;
    var a, b;
    var lastT;
    console.log("------- Data Asli ---------");
    for (i = 0; i < t.length; i++) {
      nt = parseInt(t[i]);
      ny = parseInt(y[i]);

      t2[i] = nt * nt;
      tY[i] = nt * ny;

      sumT = sumT + nt;
      sumY = sumY + ny;
      sumTY = sumTY + tY[i];
      sumT2 = sumT2 + t2[i];
      console.log(ny);
      lastT = nt;
    }

    b = (t.length * sumTY - sumT * sumY) / (t.length * sumT2 - sumT * sumT);
    a = (sumY - b * sumT) / t.length;

    console.log("nilai b : " + b);
    console.log("nilai a : " + a);

    var predictY = new Array();
    var predictT = new Array();
    var n = t.length;
    var newT = lastT + 1;

    for (i = 0; i < n; i++) {
      nB = Math.abs(b);
      var newY = a + b * newT;
      predictT[i] = newT;
      predictY[i] = newY.toFixed(2);
      newT++;
    }

    console.log("------- Model Prediksi ---------");
    for (i = 0; i < predictY.length; i++) {
      console.log(predictY[i]);
    }
    console.log("------- ************** ---------");

    var dataOri = [],
      dataPredict = [];

    for (var i = 0; i < y.length; i++) {
      ny = parseInt(y[i]);
      dataOri.push([i, ny]);
      //console.log(dataOri);
    }
    // console.log(dataOri);
    for (var i = 0; i < predictY.length; i++) {
      pY = parseInt(predictY[i]);
      dataPredict.push([i, pY]);
    }
    console.log(dataPredict);

    var options = {
      series: {
        lines: {
          show: true,
        },
        points: {
          show: true,
        },
      },
      grid: {
        hoverable: true, //IMPORTANT! this is needed for tooltip to work
      },
      yaxis: {
        min: 0,
        max: 1000,
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

    var plotObj = $.plot(
      $("#flot-line-chart"),
      [
        {
          data: dataOri,
          label: "data Original",
        },
        {
          data: dataPredict,
          label: "data Prediksi",
        },
      ],
      options
    );

    console.log("------- ************** ---------");
    console.log("------- Error ---------");
    var dataYAkses = [];
    var m = t.length;
    var vMSE = 0;
    var nI = 0;
    var vI = 1;
    for (i = 0; i < m; i++) {
      nB = Math.abs(b);
      var newYA = a + b * vI;
      cMSE = newYA - predictY[i];
      vMSE = vMSE + cMSE;
      nI++;
      vI++;
    }
    vMSE = vMSE / nI;
    console.log("Nilai Error Akhir = " + vMSE);

    console.log("------- ************** ---------");
    console.log("------- ************** ---------");
    console.log("------- 30 hari Prediksi ---------");
    console.log("nilai b : " + b);
    console.log("nilai a : " + a);
    var dataLongPredict = [];
    n = predictY.length + predictY.length;
    f = predictY.length + 1;
    nTotal = 0;
    nData = 0;
    for (var i = f; i < n; i++) {
      // pY = parseInt(predictY[i]);
      nB = Math.abs(b);
      var newY = a + b * f;
      f++;
      nTotal = nTotal + newY;
      nData++;
      dataLongPredict.push([i, newY]);
    }
    console.log(dataLongPredict);

    nRata = nTotal / nData + vMSE;
    nRata = nRata.toFixed(2);

    var plotObj2 = $.plot(
      $("#flot-line-chart2"),
      [
        {
          data: dataLongPredict,
          label: "data Prediksi 30 Hari Kedepan",
        },
      ],
      options
    );

    document.getElementById("avgData").innerHTML =
      "Rata-Rata Humidity : <b>" + nRata + "<b>";
  }
});
