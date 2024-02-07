document.addEventListener('DOMContentLoaded', function () {
    // Получение значения пользователя из localStorage
    let savedUserName = localStorage.getItem('user');

    // Установка значения ввода
    let user_nameInput = document.querySelector('.user_nameInput');
    user_nameInput.value = savedUserName;

    // Обработчик события изменения значения ввода
    user_nameInput.addEventListener('input', function (event) {
        // Проверка, совпадает ли новое значение с сохраненным
        if (user_nameInput.value !== savedUserName) {
            // Если не совпадает, отменить изменение
            user_nameInput.value = savedUserName;
        }
    });
});
