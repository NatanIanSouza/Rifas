<?php

include('../../conexao/conn.php');

$requestData = $_REQUEST;

$colunas = $requestData['columns'];

$sql = "SELECT ID, TITULO, DATE_FORMAT(DATA_SORTEIO, '%d/%m/%Y') AS DATA_SORTEIO, VALOR_RIFA FROM PROMOCAO WHERE 1=1 ";

$resultado = $pdo->query($sql);
$qtdeLinhas = $resultado->rowCount();

$filtro = $requestData['search']['value'];
if( !empty( $filtro ) ){
    $sql .= " AND (ID LIKE '$filtro%' ";
    $sql .= " OR NOME LIKE '$filtro%' ";
    $sql .= " OR CELULAR LIKE '$filtro%') ";
}

$resultado = $pdo->query($sql);
$totalFiltrados = $resultado->rowCount();

$colunaOrdem = $requestData['order'][0]['column'];
$ordem = $colunas[$colunaOrdem]['data'];
$direcao = $requestData['order'][0]['dir'];

$inicio = $requestData['start'];
$tamanho = $requestData['length'];

$sql .= " ORDER BY $ordem $direcao LIMIT $inicio, $tamanho ";
$resultado = $pdo->query($sql);
$dados = array();
while($row = $resultado->fetch(PDO::FETCH_ASSOC)){
    $dados[] = array_map(null, $row);
}

foreach ($dados as $key => $value) {

    // MASCARA
    
    $dados[$key]['VALOR_RIFA'] = number_format($dados[$key]['VALOR_RIFA'], 2);
    $dados[$key]['VALOR_RIFA'] = 'R$ '.$dados[$key]['VALOR_RIFA'];
    $dados[$key]['VALOR_RIFA'] = str_replace('.', ',', $dados[$key]['VALOR_RIFA']);


}

$json_data = array(
    "draw" => intval($requestData['draw']),
    "recordsTotal" => intval($qtdeLinhas),
    "recordsFiltered" => intval($totalFiltrados),
    "data" => $dados 
);

echo json_encode($json_data);