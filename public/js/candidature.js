$(document).ready(function() {
    const modal = $('#suppPostu');

    modal.on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var idCreneau = button.data('id') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

        console.log("data ok : " + idCreneau);

        $('form', modal).attr('action', '/user/suppPostu/'+ idCreneau)
    })
});
