<?php   
	header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    include "function_jumlah_hari.php";
    $server = "localhost";
    $username = "root";
    $password = "";
    $database = "raspi02";
    $con=new mysqli($server, $username, $password, $database);

	$b=$_GET['b']; // bulan, contoh: 11 -> November
	$c=$_GET['c']; // tahun
	
	$hr=jumlah_hari($b, $c);	
	$i=1;
	$json = '{"data": {';
	$json .= '"object":[ ';
	//$json .= '[';
	for($i=1; $i<=$hr; $i++)
	{
		if ($i<10)
		{
			$tg = "0".$i;
		} else {
			$tg = $i;
		}
		$tgl=$c."-".$b."-".$tg;
			
		$vol=0;
		$sql="SELECT COUNT(ketan) AS sketan,date FROM MS04_ketan WHERE date='$tgl' ORDER BY idMS04_ketan DESC";
		$query=mysqli_query($con,$sql)or die (mysqli_error());
		
		$r=mysqli_fetch_array($query);		
		$vol=$vol+$r['sketan'];	
		
		$json .= '{';
			$json .= 
			   '"tanggal":"'.$tgl.'",
				"data":"'.$vol.'"
			}';
		
		if($i < $hr)
		{
			$json .= ',';
		}		
	}
	$json .= ']';
	$json .= '}}';
	echo $json;
	
?>	