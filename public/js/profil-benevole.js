// Gestion des documents
$(document).ready(function() {
    // Elements
    const docForm = $("#doc-form");
    const docTable = $("#doc-table tbody");
    const deleteBtns = $(".btn-delete-doc", docTable);
    const renameBtns = $(".btn-rename-doc", docTable);

    const docDialog = $("#doc-dialog");
    const docEditForm = $("form", docDialog);
    const docRenameField = $("#rename-field", docEditForm);

    let originalName = "";
    let editingDoc = 0;

    // Function
    function addDocToTable(doc) {
        const newline =
            $(` <tr data-id="${doc.id}">
                    <td><a class="doc-title" href="${doc.fichier}">${doc.titre}</a></td>
                    <td class="text-center action-col">
                        <div class="btn-group btn-group-sm">
                            <a class="btn btn-secondary doc-dl" href="${doc.fichier}" download="${doc.filename}">
                                <i class="fas fa-file-download fa-fw"/>
                            </a>
                            <button class="btn btn-primary btn-rename-doc">
                                <i class="fas fa-pen fa-fw" />
                            </button>
                            <button class="btn btn-danger btn-delete-doc">
                                <i class="fas fa-trash fa-fw" />
                            </button>
                        </div>
                    </td>
                </tr>`);

        $(".btn-delete-doc", newline).click(sendDeleteDoc);
        $(".btn-rename-doc", newline).click(renameDoc);

        docTable.append(newline);
    }
    function renameDoc() {
        // Récup id !
        const btn = $(this);
        const row = btn.parents("tr");

        // Start modal
        originalName = $(".doc-title", row).text();
        editingDoc = row.data("id");

        docRenameField.val(originalName);

        docDialog.modal("show");
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
    function sendRenameDoc() {
        $.ajax({
            method: "post",
            url: `/user/document/${editingDoc}`,
            data: {
                titre: docRenameField.val(),
            },
            success: function(doc) {
                console.log(doc);

                // Update row
                const row = $(`[data-id="${editingDoc}"]`, docTable);

                $(".doc-title", row).text(doc.titre);
                $(".doc-dl", row).attr("download", doc.filename);
            }
        });
    }
    function sendDeleteDoc() {
        // Récup id !
        const btn = $(this);
        const row = btn.parents("tr");
        const id = row.data("id");

        // Ajax
        $.ajax({
            method: "delete",
            url: `/user/document/${id}`,
            success: function(res) {
                // On enlève la ligne
                row.remove();
            }
        });
    }

    // Events
    deleteBtns.click(sendDeleteDoc);
    renameBtns.click(renameDoc);

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

    docEditForm.submit(function(event) {
        event.preventDefault();

        if (docEditForm[0].checkValidity() === false) {
            // Invalide
            event.stopPropagation();
            docEditForm.addClass("was-validated");
        } else {
            // Valide
            docEditForm.removeClass("was-validated");
            docDialog.modal("hide");

            if (docRenameField.val() !== originalName) {
                sendRenameDoc();
            }
        }
    });
});

// Gestion des créneaux
$(document).ready(function() {
    // Modal
    const tab = $("#tab-dispo");

    const modal = $("#add-creneau");

    const form  = $("form", modal);
    const dateD = $("#date-deb", form);
    const timeD = $("#time-deb", form);
    const dateF = $("#date-fin", form);
    const timeF = $("#time-fin", form);
    const recursif = $("#recursif", form);
    const recurDeps = $(".need-recursif", form);
    const repetitions = $("#repetitions", form);
    const nbEcarts    = $("#nb-ecarts", form);
    const typeEcart   = $("#type-ecart", form);

    // Functions
    function twodigits(i) {
        if (i < 10) {
            return `0${i}`;
        }

        return i.toString();
    }

    // Full calendar
    const calendar = new FullCalendar.Calendar($('#calendar')[0], {
        locale: 'fr',
        plugins: ['bootstrap', 'dayGrid', 'interaction'],
        events: '/user/creneaux',

        // style
        themeSystem: 'bootstrap',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridDay,dayGridWeek,dayGridMonth',
        },

        // events
        dateClick: function(info) {
            const h = new Date().getHours();

            dateD.val(info.dateStr); timeD.val(`${twodigits((h + 1) % 24)}:00`);
            dateF.val(info.dateStr); timeF.val(`${twodigits((h + 2) % 24)}:00`);

            modal.modal('show');
        }
    });

    // Events
    tab.on('shown.bs.tab', function() {
        calendar.render();
    });

    modal.on('show.bs.tab', function() {
        if (recursif.prop("checked")) {
            recurDeps.prop("disabled", false);
            recurDeps.prop("required", true);
        } else {
            recurDeps.prop("disabled", true);
            recurDeps.prop("required", false);
        }
    });

    recursif.change(function() {
        if (recursif.prop("checked")) {
            recurDeps.prop("disabled", false);
            recurDeps.prop("required", true);
        } else {
            recurDeps.prop("disabled", true);
            recurDeps.prop("required", false);
        }
    });

    form.submit(function(event) {
        event.preventDefault();

        if (form[0].checkValidity() === false) {
            // Invalide
            event.stopPropagation();
            form.addClass("was-validated");
        } else {
            // Valide
            form.removeClass("was-validated");

            // Data
            const data = {
                debut: `${dateD.val()}T${timeD.val()}:00.000Z`,
                fin:   `${dateF.val()}T${timeF.val()}:00.000Z`,
                repetitions: 1,
            };

            if (recursif.prop("checked")) {
                data.repetitions = repetitions.val();
                data.ecart = nbEcarts.val() * typeEcart.val();
            }

            // Ajax
            $.ajax({
                method: 'put',
                url: '/user/creneaux/add',
                data: data,

                success: function() {
                    modal.modal('hide');
                    calendar.refetchEvents();
                }
            });

            // Reset
            recursif.prop("checked", false);
            recurDeps.val("");
            recurDeps.prop("disabled", true);
            recurDeps.prop("required", false);
        }
    });
});