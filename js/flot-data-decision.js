function getKlasifikasi() {
  var vTemp = Array();
  var vPh = Array();
  var vAmonia = Array();
  var dampak = Array();
  var keterangan = Array();
  var loop = Array();

  vTemp = document.getElementById("avgN1").innerHTML.split(",").map(Number);
  vPh = document.getElementById("avgN2").innerHTML.split(",").map(Number);
  vAmonia = document.getElementById("avgN3").innerHTML.split(",").map(Number);
  loop = document.getElementById("avgLoop").innerHTML.split(",").map(Number);

  var table = document.getElementById("dataTables-example");
  var x = document.getElementById("dataTables-example").rows.length;
  var tableRef = document
    .getElementById("dataTables-example")
    .getElementsByTagName("tbody")[0];

  //document.getElementById("dataTables-example").deleteRow(x-1);
  for (i = x; i > 1; i--) {
    document.getElementById("dataTables-example").deleteRow(i - 1);
  }

  for (let index = 0; index < loop.length; index++) {
    // console.log(parseFloat(vTemp[index]).toFixed(2));
    // console.log(parseFloat(vPh[index]).toFixed(2));
    // console.log(parseFloat(vAmonia[index]).toFixed(2));
    if (parseFloat(vTemp[index]).toFixed(2) < parseFloat(25)) {
      if (
        parseFloat(vPh[index]).toFixed(2) >= parseFloat(1) &&
        parseFloat(vPh[index]).toFixed(2) <= parseFloat(5)
      ) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] =
            "1. Memberikan lampu dbawah air / memberikan elemen pemanasan pada kolam 2. Memberikan saringan yang terdiri dari pecahan koral dan pecahan kulit kerang dicampur dengan potongan batu kapur pada saluran aerasi kolam. 3. Tidak perlu penambahan apapun";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] =
            "1. Memberikan lampu dbawah air / memberikan elemen pemanasan pada kolam. 2. Memberikan saringan yang terdiri dari pecahan koral dan pecahan kulit kerang dicampur dengan potongan batu kapur pada saluran aerasi kolam. 3. Pergantian air dilakukan dengan meletakkan selang pada 1 titik kemudian air dibuang sebanyak 10 – 20 %";
        }
      } else if (
        parseFloat(vPh[index]).toFixed(2) >= parseFloat(7) &&
        parseFloat(vPh[index]).toFixed(2) <= parseFloat(8)
      ) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] =
            "1. Memberikan lampu dbawah air / memberikan elemen pemanasan pada kolam. 2. Tidak perlu dilakukan terapi terhadap kolam ikan .3. Tidak perlu penambahan apapun";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] =
            "1. Memberikan lampu dbawah air / memberikan elemen pemanasan pada kolam. 2. Tidak perlu dilakukan terapi terhadap kolam ikan. 3. Pergantian air dilakukan dengan meletakkan selang pada 1 titik kemudian air dibuang sebanyak 10 – 20 %";
        }
      } else if (parseFloat(vPh[index]).toFixed(2) >= parseFloat(11)) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] =
            "1. Memberikan lampu dbawah air / memberikan elemen pemanasan pada kolam. 2. Merendam daun ketapang didasar air selama beberapa hari.Sebelum merendam daun ketapang rebus terlebih dahulu  guna menghilangkan zat tanin yang terkandung, karena zat tanin dapat menimbulkan warna kuning pada air.. 3. Tidak perlu penambahan apapun";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] = "Role 6";
        }
      }
    } else if (
      parseFloat(vTemp[index]).toFixed(2) >= parseFloat(25) &&
      parseFloat(vTemp[index]).toFixed(2) <= parseFloat(30)
    ) {
      if (
        parseFloat(vPh[index]).toFixed(2) >= parseFloat(1) &&
        parseFloat(vPh[index]).toFixed(2) <= parseFloat(5)
      ) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] = "Role 7";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] = "Role 8";
        }
      } else if (
        parseFloat(vPh[index]).toFixed(2) >= parseFloat(7) &&
        parseFloat(vPh[index]).toFixed(2) <= parseFloat(8)
      ) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] = "Role 9";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] = "Role 10";
        }
      } else if (parseFloat(vPh[index]).toFixed(2) >= parseFloat(11)) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] = "Role 11";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] = "Role 12";
        }
      }
    } else if (parseFloat(vTemp[index]).toFixed(2) > parseFloat(30)) {
      if (
        parseFloat(vPh[index]).toFixed(2) >= parseFloat(1) &&
        parseFloat(vPh[index]).toFixed(2) < parseFloat(5)
      ) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] = "Role 13";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] = "Role 14";
        }
      } else if (
        parseFloat(vPh[index]).toFixed(2) >= parseFloat(5) &&
        parseFloat(vPh[index]).toFixed(2) <= parseFloat(8)
      ) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          dampak[index] =
            "1. Ikan akan mengalami stress pernapasan dan bahkan dapat menyebabkan kerusakan insang permanen\n2. Ikan mengalami pertumbuhan pesat\n3. Ikan berkembang biak dengan baik";
          keterangan[index] =
            "1. Penambahan air sebanyak 10 – 20%\n2. Tidak perlu dilakukan terapi terhadap kolam ikan\n3. Tidak perlu penambahan apapun";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          dampak[index] =
            "1. Ikan akan mengalami stress pernapasan dan bahkan dapat menyebabkan kerusakan insang permanen\n2. Ikan mengalami pertumbuhan pesat\n3. Nafsu makan ikan menurun";
          keterangan[index] =
            "1. Penambahan air sebanyak 10 – 20%\n2. Tidak perlu dilakukan terapi terhadap kolam ikan\n3. Pergantian air dilakukan dengan meletakkan selang pada 1 titik kemudian air dibuang sebanyak 10 – 20 %. ";
        }
      } else if (parseFloat(vPh[index]).toFixed(2) >= parseFloat(11)) {
        if (parseFloat(vAmonia[index]).toFixed(2) == parseFloat(0.01)) {
          keterangan[index] = "Role 17";
        } else if (parseFloat(vAmonia[index]).toFixed(2) > parseFloat(0.01)) {
          keterangan[index] = "Role 18";
        }
      }
    }

    var row = tableRef.insertRow(tableRef.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    k = loop[loop.length - 1] + loop[index];

    cell1.innerHTML = k;
    cell2.innerHTML = keterangan[index];
    cell3.innerHTML = dampak[index];
    // console.log(parseFloat(vAmonia[index]));
  }
}
