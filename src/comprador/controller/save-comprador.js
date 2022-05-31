$(document).ready(function() {

    $('.btn-save').click(function(e) {
        e.preventDefault()

        let dados = $('#form-comprador').serialize()

        dados += `&operacao=${$('.btn-save').attr('data-operation')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: dados,
            url: 'src/comprador/model/save-comprador.php',
            success: function(dados) {
                Swal.fire({
                    title: 'e-Rifa',
                    text: dados.mensagem,
                    icon: dados.tipo,
                    confirmButtonText: 'OK'
                })

                $('#modal-comprador').modal('hide')
                $('#table-comprador').DataTable().ajax.reload()
            }
        })
    })

})