$(document).ready(function() {

    $('#table-vendedor').on('click', 'button.btn-edit', function(e) {

        e.preventDefault()

        // Alterar as informações do modal para apresentação dos dados

        $('.modal-title').empty()
        $('.modal-body').empty()

        $('.modal-title').append('Visualização de registro')

        let ID = `ID=${$(this).attr('id')}`

        $.ajax({
            type: 'POST',
            dataType: 'json',
            assync: true,
            data: ID,
            url: 'src/vendedor/model/view-vendedor.php',
            success: function(dado) {
                if (dado.tipo == "success") {
                    $('.modal-body').load('src/vendedor/view/form-vendedor.html', function() {
                        $('#NOME').val(dado.dados.NOME)
                        $('#CELULAR').val(dado.dados.CELULAR)
                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#SENHA').val(dado.dados.SENHA)
                        $('#TIPO_ID').empty()
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: 'src/tipo/model/all-tipos.php',
                            success: function(json_data) {
                                $('#TIPO_ID').empty()
                                for (const result of json_data) {
                                    if (dado.dados.TIPO_ID == result.ID) {
                                        $('#TIPO_ID').append(`<option value="${result.ID}" selected>${result.DESCRICAO}</option>`)
                                    } else {
                                        $('#TIPO_ID').append(`<option value="${result.ID}">${result.DESCRICAO}</option>`)
                                    }
                                }
                            }
                        })
                        $('#ID').val(dado.dados.ID)
                    })
                    $('.btn-save').removeAttr('data-operation', 'insert')
                    $('.btn-save').show()
                    $('#modal-vendedor').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'Sistema de Rifas', // Título da janela SweetAlert
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // vendedor de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})