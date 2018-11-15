$(document).ready(function() {
    // Select avec placeholder
    $.fn.placeholder = function() {
        this.each(function() {
            // Elements
            const select = $(this);
            const placeholder = select.children('option:first-child');

            // Fonction
            function setclass() {
                if (placeholder.is(':selected')) {
                    select.addClass('placeholder');
                } else {
                    select.removeClass('placeholder');
                }
            }

            // Event
            $(this).change(setclass);

            // Initialisation
            setclass();
        });

        return this;
    };
    $("select.placeholder").placeholder();
});