<?php


$hostname = "sql102.epizy.com";
$database = "epiz_31454052_natanrifas";
$username = "epiz_31454052";
$password = "6rNDaEMBgu";

try {
    $pdo = new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo 'Conexão realizada com sucesso';
} catch(PDOException $e) {
    echo 'Erro:'.$e->getMessage();
}