document.addEventListener("DOMContentLoaded", function () {
    (function () {
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
    })();

    (function () {
        var requiredFields = document.querySelectorAll('.enrollment__input[required]');
        var form = document.querySelector('.enrollment__form');
        var submitButton = document.querySelector('.button--submit');

        form.addEventListener('invalid', function (event) {
            event.preventDefault();
        }, true);

        for (var i = 0; i < requiredFields.length; i++) {
            requiredFields[i].addEventListener('blur', function(event) {
                var currentField = event.target;
                var currentMessage = currentField.parentNode.querySelector('.error-message');
                console.log(currentMessage);
                if (currentField.checkValidity() && currentMessage) {
                    removeMessage(currentMessage);
                };
            });
        }

        var addMessage = function (container, message) {
            var messageElement = document.createElement('span');
            messageElement.textContent = message;
            messageElement.classList.add('error-message');
            container.appendChild(messageElement);
        };

        var removeMessage = function (messageElement) {
            messageElement.parentNode.removeChild(messageElement);
        }

        submitButton.addEventListener('click', function() {
            console.log('clicked');
            var invalidFields = document.querySelectorAll('.enrollment__input:invalid');
            for (var i = 0; i < invalidFields.length; i++) {
                var messageContainer = invalidFields[i].parentNode;
                addMessage(messageContainer, 'Заполните это поле');
            }
        });
    })();
});