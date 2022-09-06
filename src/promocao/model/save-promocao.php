<?php

include('../../conexao/conn.php');

$requestData = $_REQUEST;

if(empty($requestData['TITULO'])){
    $dados = array(
        "tipo" => 'error',
        "mensagem" => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
    );
} else {
    $VLRPG1 = str_replace(['R$'],'',$requestData['VALOR_RIFA']);
        $VALOR_RIFA = str_replace([','],'.',$VLRPG1);
    $VLRPG2 = str_replace(['R$'],'',$requestData['ARRECADACAO']);
        $ARRECADACAO = str_replace([','],'.',$VLRPG2);
    $ID = isset($requestData['ID']) ? $requestData['ID'] : '';
    $operacao = isset($requestData['operacao']) ? $requestData['operacao'] : '';

    if($operacao == 'insert'){
        try{
            $stmt = $pdo->prepare('INSERT INTO PROMOCAO (TITULO, DATA_INICIO, DATA_FIM, DATA_SORTEIO, ARRECADACAO, VALOR_RIFA, DESCRICAO) VALUES (:a, :b, :c, :d, :e, :f, :g)');
            $stmt->execute(array(
                ':a' => $requestData['TITULO'],
                ':b' => $requestData['DATA_INICIO'],
                ':c' => $requestData['DATA_FIM'],
                ':d' => $requestData['DATA_SORTEIO'],
                ':e' => $ARRECADACAO,
                ':f' => $VALOR_RIFA,
                ':g' => $requestData['DESCRICAO']
            ));
            $dados = array(
                "tipo" => 'success',
                "mensagem" => 'Registro salvo com sucesso.'
            );
        } catch(PDOException $e) {
            $dados = array(
                "tipo" => 'error',
                "mensagem" => 'Não foi possível efetuar o cadastro da promoção.'
            );
        }
    } else {
        try{
            $stmt = $pdo->prepare('UPDATE PROMOCAO SET TITULO = :a, DATA_INICIO = :b, DATA_FIM = :c, DATA_SORTEIO = :d, ARRECADACAO = :e, VALOR_RIFA = :f, DESCRICAO = :g WHERE ID = :id');
            $stmt->execute(array(
                ':id' => $ID,
                ':a' => $requestData['TITULO'],
                ':b' => $requestData['DATA_INICIO'],
                ':c' => $requestData['DATA_FIM'],
                ':d' => $requestData['DATA_SORTEIO'],
                ':e' => $ARRECADACAO,
                ':f' => $VALOR_RIFA,
                ':g' => $requestData['DESCRICAO']
            ));
            $dados = array(
                "tipo" => 'success',
                "mensagem" => 'Registro atualizado com sucesso.'
            );
        } catch (PDOException $e){
            $dados = array(
                "tipo" => 'error',
                "mensagem" => 'Não foi possível efetuar a alteração do registro.'
            );
        }
    }
}

    echo json_encode($dados);