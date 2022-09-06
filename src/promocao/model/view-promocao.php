<?php

include('../../conexao/conn.php');

$ID = $_REQUEST['ID'];

$sql = "SELECT * FROM PROMOCAO WHERE ID = $ID";

$resultado = $pdo->query($sql);

if($resultado){
    $result = array();
    while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
        $result = array_map(null, $row);
    }
    $result['VALOR_RIFA'] = 'R$ ' . number_format($result['VALOR_RIFA'],2,',','.');
    $result['ARRECADACAO'] = 'R$ ' . number_format($result['ARRECADACAO'],2,',','.');
    $dados = array(
        'tipo' => 'success',
        'mensagem' => '',
        'dados' => $result
    );
} else {
    $dados = array(
        'tipo' => 'error',
        'mensagem' => 'Não foi possível obter o registro solicitado.',
        'dados' => array()
    );
}
echo json_encode($dados);