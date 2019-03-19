$(document).ready(function() {
    // Champs
    const form = $("#inscription-form");

    const emailField   = $("#email-field");
    const mdpField     = $("#mdp-field");
    const confirmField = $("#confirm-mdp-field");
    const requiredFields = $("input[required]", form).not(confirmField);

    const emailExists = $("#email-exists");
    const noEmail     = $("#no-email");
    const startMail   = emailField.hasClass("is-invalid") ? emailField.val() : null;

    // Fonctions
    function checkEmail() {
        const mail = emailField.val();

        if (mail === startMail) {
            emailField.addClass("is-invalid");

            emailExists.removeClass("d-none");
            noEmail.addClass("d-none");
        } else {
            if (mail === "") {
                emailField.addClass("is-invalid");
            } else {
                emailField.removeClass("is-invalid");
            }

            emailExists.addClass("d-none");
            noEmail.removeClass("d-none");
        }
    }
    function checkConfirm() {
        if (confirmField.val() === mdpField.val()) {
            confirmField.addClass("is-valid");
            confirmField.removeClass("is-invalid");
        } else {
            confirmField.addClass("is-invalid");
            confirmField.removeClass("is-valid");
        }
    }
    function checkRequired(event) {
        const input = $(event.target);

        if (input.val() === "" || (input.attr("type") === "checkbox" && !input.is(":checked"))) {
            input.addClass("is-invalid");
        } else {
            input.removeClass("is-invalid");
        }
    }

    // Events
    requiredFields.change(checkRequired);
    requiredFields.keyup(checkRequired);

    emailField.change(checkEmail);
    emailField.keyup(checkEmail);

    confirmField.change(checkConfirm);
    confirmField.keyup(checkConfirm);

    mdpField.change(() => { if (confirmField.hasClass("is-valid") || confirmField.hasClass("is-invalid")) checkConfirm()});
    mdpField.keyup( () => { if (confirmField.hasClass("is-valid") || confirmField.hasClass("is-invalid")) checkConfirm()});

    form.submit(function(event) {
        // Validity check
        requiredFields.each((i, e) => {
            console.log(e);
            checkRequired({target: e});
        });

        let valid = true;
        valid &= !confirmField.hasClass("is-invalid");
        valid &= !requiredFields.hasClass("is-invalid");

        if (!valid) {
            event.preventDefault();
            event.stopPropagation();
        }
    });
});