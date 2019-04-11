$(document).ready(function() {
    // Elements
    const tab = $("#tab-calendrier");

    const addmodal = $("#add-creneau");
    const remmodal = $("#rem-creneau");

    const form  = $("form", addmodal);
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

    function path(p) {
        let b = window.location.pathname;

        while (b.endsWith('/')) {
            b = b.slice(0, -1);
        }

        while (p.startsWith('/')) {
            p = p.slice(1);
        }

        return b + '/' + p;
    }

    // Datatable
    $(".candidats").DataTable({
        "language": {
            "url": "/datatable.lang"
        }
    });

    // Full Calendar
    const calendar = new FullCalendar.Calendar($('#calendar')[0], {
        locale: 'fr',
        plugins: ['bootstrap', 'dayGrid', 'interaction'],
        eventSources: [
            {
                url: path("creneaux")
            },
        ],

        // style
        themeSystem: 'bootstrap',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridDay,dayGridWeek,dayGridMonth',
        },

        // events
        dateClick(info) {
            const h = new Date().getHours();

            dateD.val(info.dateStr); timeD.val(`${twodigits((h + 1) % 24)}:00`);
            dateF.val(info.dateStr); timeF.val(`${twodigits((h + 2) % 24)}:00`);

            addmodal.modal('show');
        },

        eventClick(info) {
            $("form", remmodal).attr('action', path(`creneaux/${info.event.id}/remove`));
            remmodal.modal('show');
        },
    });

    // Events
    tab.on('shown.bs.tab', function() {
        calendar.render();
    });

    addmodal.on('show.bs.tab', function() {
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
                url: `${window.location.pathname}/creneaux/add`,
                data: data,

                success: function() {
                    window.location.reload();
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
