(function() {
    // File Inputs
    $.fn.fileinput = function() {
        this.each(function() {
            // Eléments
            const input = $(this).children('.custom-file-input');
            const label = $(this).children('.custom-file-label');

            // Function
            function setlabel() {
                if (input.prop("files").length > 0) {
                    label.text(input.prop("files")[0].name);
                    label.removeClass("placeholder");
                } else {
                    label.text(input.attr("placeholder"));
                    label.addClass("placeholder");
                }
            }

            // Events
            input.change(function() {
                setlabel();
            });

            // Initialisation
            setlabel();
        });

        return this;
    };
    $(".custom-file").fileinput();

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
    $("select.placeholder").placeholder(); //s'applique sur tous les éléments select.placeholder

    // Editable select
    $.fn.editableselect = function() {
        this.each(function() {
            // Elements
            const editableselect = $(this);

            const input = $('input', this);
            const button = $('button', this);
            const div = $('div', this);

            // Events
            // - focus
            input.focusout(function() {
                // Fermeture
                input.removeClass("focus");
                button.removeClass("actif");
                div.removeClass("actif");
            });

            $("*", this).focusin(function() {
                input.addClass("focus");
            });
            $("*", this).not(input).focusout(function(e) {
                // Perte de focus
                if (!$(e.relatedTarget).parents().is(editableselect)) {
                    input.trigger("focusout");
                }
            });

            // - clicks
            button.click(function() {
                input.toggleClass("actif");
                button.toggleClass("actif");
                div.toggleClass("actif");
            });

            $("p", div).click(function() {
                // Copie de la valeur
                input.val($(this).text());
            });
        });

        return this;
    };
    $(".editable-select").editableselect();
})();