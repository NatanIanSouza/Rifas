<?php


$hostname = "sql102.epizy.com";
$database = "epiz_31454052_natanrifas";
$username = "epiz_31454052";
$password = "6rNDaEMBgu";

if($conecta = mysqli_connect($hostname, $username, $password, $database)){
    echo 'Conected succesfully!!';
} else {
    echo 'Error: '.mysqli_connect_error();
}