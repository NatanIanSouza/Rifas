$(document).ready(function() {
    $('#table-vendedor').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": "src/vendedor/model/list-vendedor.php",
            "type": "POST"
        },
        "language": {
            "url": "libs/DataTables/pt_br.json"
        },
        "columns": [{
                "data": 'ID',
                "className": 'text-start'
            },
            {
                "data": 'NOME',
                "className": 'text-start'
            },
            {
                "data": 'CELULAR',
                "className": 'text-start'
            },
            {
                "data": 'ID',
                "orderable": false,
                "searchable": false,
                "className": 'text-center',
                "render": function(data, type, row, meta) {
                    return `
                    <button id="${data}" class="btn btn-info btn-sm btn-view"><i class="mdi mdi-eye"></i></button>
                    <button id="${data}" class="btn btn-primary btn-sm btn-edit"><i class="mdi mdi-pencil"></i></button>
                    <button id="${data}" class="btn btn-danger btn-sm btn-delete"><i class="mdi mdi-delete"></i></button>
                    `
                }
            }
        ]
    })
})