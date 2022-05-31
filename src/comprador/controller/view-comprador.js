$(document).ready(function() {

    $('#table-comprador').on('click', 'button.btn-view', function(e) {

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
                        $('#NOME').attr('readonly', 'true')
                        $('#CELULAR').val(dado.dados.CELULAR)
                        $('#CELULAR').attr('readonly', 'true')
                    })
                    $('.btn-save').hide()
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