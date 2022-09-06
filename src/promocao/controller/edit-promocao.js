$(document).ready(function() {

    $('#table-promocao').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/promocao/model/view-promocao.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/promocao/view/form-promocao.html', function() {
                        $('#TITULO').val(dado.dados.TITULO)
                        $('#DATA_INICIO').val(dado.dados.DATA_INICIO)
                        $('#DATA_FIM').val(dado.dados.DATA_FIM)
                        $('#DATA_SORTEIO').val(dado.dados.DATA_SORTEIO)
                        $('#ARRECADACAO').val(dado.dados.ARRECADACAO)
                        $('#VALOR_RIFA').val(dado.dados.VALOR_RIFA)
                        $('#DESCRICAO').val(dado.dados.DESCRICAO)
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').show()
                    $('.btn-save').removeAttr('data-operation', 'insert')
                    $('#modal-promocao').modal('show')
                } else {
                    Swal.fire({
                        title: 'e-Rifa',
                        text: dado.mensagem,
                        type: dado.tipo,
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})