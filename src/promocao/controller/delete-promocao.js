$(document).ready(function() {

    $('#table-promocao').on('click', 'button.btn-delete', function(e) {

        e.preventDefault()

        let ID = `ID=${$(this).attr('id')}`

        Swal.fire({
            title: 'e-Rifa',
            text: 'Deseja realmente excluir esse registro?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não'
        }).then((result => {
            if (result.value) {

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    assync: true,
                    data: ID,
                    url: 'src/promocao/model/delete-promocao.php',
                    success: function(dados) {
                        Swal.fire({
                            title: 'e-Rifa',
                            text: dados.mensagem,
                            icon: dados.promocao,
                            confirmButtonText: 'OK'
                        })

                        $('#table-promocao').DataTable().ajax.reload()
                    }
                })
            }
        }))

    })
})