$(document).ready(function() {

    $('#table-tipo').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Edição de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/tipo/model/view-tipo.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/tipo/view/form-tipo.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').removeAttr('data-operation', 'insert')
                    $('.btn-save').show()
                    $('#modal-tipo').modal('show')
                } else {
                    Swal.fire({
                        title: 'Rifas',
                        text: dado.mensagem,
                        type: dado.tipo,
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})