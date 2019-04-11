$(document).ready(function() {
    // Elements
    const tab = $("#tab-calendrier");

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
                url: 'calendrier'
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
