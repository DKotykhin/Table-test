
$(".table__body").sortable({
    delay: 100,
    stop: function () {
        var selectedRow = new Array();
        $('.table__body>tr').each(function () {
            selectedRow.push($(this).attr("id"));
        });
    }
});