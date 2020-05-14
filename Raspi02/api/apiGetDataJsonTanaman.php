<?php
        // header("Access-Control-Allow-Origin: *");
        // header("Content-Type: application/json");

        $server = "localhost";
        $username = "root";
        $password = "";
        $database = "raspi02";

        $con = mysqli_connect($server, $username, $password, $database);
        $sql = "SELECT * FROM tb_jenis_tanaman";
        $result = mysqli_query($con, $sql);
        $array = array();
        $subArray=array();

    while($row =mysqli_fetch_array($result))
    {
        $subArray['id'] = $row['id'];
        $subArray['nama_tanaman']= $row['nama_tanaman'];
        $subArray['temp']= $row['temp'];
        $subArray['hum']= $row['hum'];
        $subArray['ldr']= $row['ldr'];
        $subArray['ketinggian']= $row['ketinggian'];
        $subArray['kta']= $row['kta'];
        $subArray['cur']= $row['cur'];

        $array[] =  $subArray ;
    }
    // echo json_encode($array);
    echo'{"records":'.json_encode($array).'}';
    mysqli_close($con);
?>
