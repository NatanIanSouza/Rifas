$(document).ready(function() {

    $('#table-comprador').on('click', 'button.btn-edit', function(e) {

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
            url: 'src/comprador/model/view-comprador.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/comprador/view/form-comprador.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#CELULAR').val(dado.dados.CELULAR)
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').show()
                    $('#modal-comprador').modal('show')
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