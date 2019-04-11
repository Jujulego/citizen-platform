$(document).ready(function() {
    // Elements
    const tab = $("#tab-calendrier");

    // Datatable
    $("#missions table").DataTable({
        "language": {
            "url": "/datatable.lang"
        }
    });

    // Full Calendar
    const calendar = new FullCalendar.Calendar($('#calendar')[0], {
        locale: 'fr',
        plugins: ['bootstrap', 'dayGrid'],
        eventSources: [
            {
                url: '/asso/calendrier'
            },
        ],

        // style
        themeSystem: 'bootstrap',
        header: {
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridDay,dayGridWeek,dayGridMonth',
        },
    });

    // Events
    tab.on('shown.bs.tab', function() {
        calendar.render();
    });
});

