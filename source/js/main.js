document.addEventListener("DOMContentLoaded", function () {
    var attachFileInput = document.querySelector('.enrollment__input--attach-file');
    var pseudoInput = document.querySelector('.input--pseudo');
    var pseudoButton = document.querySelector('.button--attach-file');

    pseudoButton.addEventListener('click', function (event) {
        event.preventDefault();
        attachFileInput.click(function (event) {
            event.stopPropagation();
        });
    });

    attachFileInput.addEventListener('change', function (event) {
        var attachedFileName = event.target.files[0].name;
        pseudoInput.value = attachedFileName;
    });
});