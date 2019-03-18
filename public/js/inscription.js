$(document).ready(function() {
    // Champs
    const form = $("#inscription-form");

    const emailField  = $("#email-field");
    const emailExists = $("#email-exists");
    const noEmail     = $("#no-email");
    const startMail   = emailField.hasClass("is-invalid") ? emailField.val() : null;

    const mdpField     = $("#mdp-field");
    const confirmField = $("#confirm-mdp-field");

    // Fonctions
    function checkConfirm() {
        confirmField.attr("pattern", mdpField.val());
    }

    function emailValidateMsg() {

        if (startMail === emailField.val()) {
            form.removeClass("was-validated");
            emailField.addClass("is-invalid");

            emailExists.removeClass("d-none");
            noEmail.addClass("d-none");
        } else {
            form.addClass("was-validated");
            emailField.removeClass("is-invalid");

            emailExists.addClass("d-none");
            noEmail.removeClass("d-none");
        }
    }

    // Init
    checkConfirm();
    emailValidateMsg();

    // Events
    emailField.change(emailValidateMsg);
    emailField.keyup(emailValidateMsg);

    mdpField.change(checkConfirm);
    mdpField.keyup(checkConfirm);

    form.submit(function(event) {
        // Validity check
        if (emailField.hasClass("is-invalid")) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (form[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Validated !
        form.addClass("was-validated");
    });
});