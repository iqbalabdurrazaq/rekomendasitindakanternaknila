<?php   
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include "function_jumlah_hari.php";
    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "raspi02";
    $con=new mysqli($server, $username, $password, $database);
    
	$b=$_GET['b']; // tahun
	
	$i=1;
	$json = '{"data": {';
	$json .= '"object":[ ';
	//$json .= '[';
	for($i=1; $i<=12; $i++)
	{			
		$vol=0;
		$sql="SELECT COUNT(rpm) AS srpm,date FROM MS06_rpm WHERE MONTH(date)='$i' AND YEAR(date) ='$b' ORDER BY idMS06_rpm DESC";
		$query=mysqli_query($con,$sql)or die (mysqli_error());
		
		$r=mysqli_fetch_array($query);		
		$vol=$r['srpm'];			
		
		$json .= '{';
			$json .= 
			    '"bulan":"'.$i.'",
				"data":"'.$vol.'"
			}';
		
		if($i < 12)
		{
			$json .= ',';
		}		
	}
	$json .= ']';
	$json .= '}}';
	echo $json;
	
	/*
	OUTPUT:
   [{"kd_pelanggan":"PLG-001", "bulan":"2016-10", "volume":"1000 L/H"},
    {"kd_pelanggan":"PLG-001", "bulan":"2016-11", "volume":"805 L/H"},
    {"kd_pelanggan":"PLG-001", "bulan":"2016-12", "volume":"900 L/H"}]
	*/
?>	