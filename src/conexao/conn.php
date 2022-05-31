<?php

// Conexão Online:
// $hostname = "sql102.epizy.com";
// $database = "epiz_31454052_natanrifas";
// $username = "epiz_31454052";
// $password = "6rNDaEMBgu";

$hostname = "localhost";
$database = "rifa";
$username = "root";
$password = "";

try {
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$database, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo 'Conexão realizada com sucesso';
} catch(PDOException $e) {
    echo 'Erro:'.$e->getMessage();
}