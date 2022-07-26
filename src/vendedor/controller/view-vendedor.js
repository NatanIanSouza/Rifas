$(document).ready(function() {

    $('#table-vendedor').on('click', 'button.btn-view', function(e) {

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
                        $('#LOGIN').attr('readonly', 'true')
                        $('#SENHA').attr('readonly', 'true')
                        $('#LOGIN').val(dado.dados.LOGIN)
                        $('#SENHA').val(dado.dados.SENHA)
                        $('#NOME').attr('readonly', 'true')
                        $('#CELULAR').attr('readonly', 'true')
                        $.ajax({
                            type: 'POST',
                            dataType: 'json',
                            url: 'src/tipo/model/all-tipo.php',
                            success: function(dados) {
                                for (const result of dados) {
                                    if (dado.dados.TIPO_ID == result.ID) {
                                        $('#TIPO_ID').append(`<option value="${result.ID}">${result.DESCRICAO}</option>`)
                                    }
                                }
                            }
                        })
                        $('#TIPO_ID').attr('readonly', 'true')

                    })
                    $('.btn-save').hide()
                    $('#modal-vendedor').modal('show')
                } else {
                    Swal.fire({ // Inicialização do SweetAlert
                        title: 'e-Rifa', // Título da janela SweetAler
                        text: dado.mensagem, // Mensagem retornada do microserviço
                        type: dado.tipo, // vendedor de retorno [success, info ou error]
                        confirmButtonText: 'OK'
                    })
                }
            }
        })

    })
})