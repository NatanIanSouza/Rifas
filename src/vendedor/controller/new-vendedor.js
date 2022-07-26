$(document).ready(function() {
    $('.btn-new').click(function(e) {
        e.preventDefault()

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Adicionar novo vendedor')

        $('.modal-body').load('src/vendedor/view/form-vendedor.html', function() {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                mimeType: "multipart/form-data",
                url: 'src/tipo/model/all-tipos.php',
                success: function(json_data) {
                    $('#form-vendedor #TIPO_ID').empty()
                    $('#form-vendedor #TIPO_ID').append('<option value="">Selecione o tipo...</option>')
                    for (const result of json_data) {
                        $('#form-vendedor #TIPO_ID').append(`<option value="${result.ID}">${result.DESCRICAO}</option>`)
                    }
                }
            })
        })

        $('.btn-save').show()

        $('.btn-save').attr('data-operation', 'insert')

        $('#modal-vendedor').modal('show')
    })

    $('.close, #close').click(function(e) {
        e.preventDefault()
        $('#modal-vendedor').modal('hide')
    })
})