$(document).ready(function() {
    // Elements
    const docForm = $("#doc-form");
    const docTable = $("#doc-table tbody");
    const deleteBtns = $(".btn-delete-doc", docTable);

    // Function
    function addDocToTable(doc) {
        const newline =
            $(` <tr>
                    <td><a href="${doc.lien}">${doc.titre}</a></td>
                    <td class="text-center action-col">
                        <div class="btn-group btn-group-sm">
                            <a class="btn btn-primary" href="${doc.lien}" download="${doc.filename}">
                                <i class="fas fa-file-download"/>
                            </a>
                            <button class="btn btn-danger btn-delete-doc" data-id="${doc.id}">
                                <i class="fas fa-trash" />
                            </button>
                        </div>
                    </td>
                </tr>`);

        $(".btn-delete-doc", newline).click(deleteDoc);

        docTable.append(newline);
    }

    function sendNewDoc() {
        // Récupération des valeurs
        const data = new FormData(docForm[0]);

        // Ajax
        $.ajax({
            method: "post",
            url: "/user/document/add",
            data: data,
            processData: false,
            contentType: false,
            success: function(res) {
                addDocToTable(res);
            }
        });
    }

    function deleteDoc() {
        // Récup id !
        const btn = $(this);
        const id = btn.data("id");

        // Ajax
        $.ajax({
            method: "delete",
            url: `/user/document/${id}`,
            success: function(res) {
                // On enlève la ligne
                btn.parent().parent().remove();
            }
        });
    }

    // Events
    deleteBtns.click(deleteDoc);
    docForm.submit(function(event) {
        event.preventDefault();

        if (docForm[0].checkValidity() === false) {
            // Invalide
            event.stopPropagation();
            docForm.addClass("was-validated");
        } else {
            // Valide
            docForm.removeClass("was-validated");
            sendNewDoc();
        }
    });
});