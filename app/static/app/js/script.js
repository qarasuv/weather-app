document.addEventListener('DOMContentLoaded', () => {
    const apiKey = document.getElementById('config').getAttribute('data-api-key');
    const cityInput = document.getElementById('cityInput');
    const stateInput = document.getElementById('stateInput');
    const countryInput = document.getElementById('countryInput');
    const latInput = document.getElementById('latInput');
    const lonInput = document.getElementById('lonInput');
    const suggestions = document.getElementById('suggestions');
    const form = document.getElementById('weatherForm');
    const selectionMade = document.getElementById('selectionMade');

    cityInput.addEventListener('input', function() {
        selectionMade.value = 'false'; // Reset flag on input change
        const query = cityInput.value.trim();
        if (query.length > 2) { // Запрашивать только если введено больше 2 символов
            fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    suggestions.innerHTML = ''; // Очистить предыдущие результаты
                    data.forEach(city => {
                        const div = document.createElement('div');
                        div.className = 'autocomplete-suggestion';
                        const displayName = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
                        div.textContent = displayName;

                        div.addEventListener('click', () => {
                            cityInput.value = city.name; // Установить значение поля ввода
                            stateInput.value = city.state || ''; // Установить значение штата, если есть
                            countryInput.value = city.country; // Установить значение страны
                            latInput.value = city.lat; // Установить значение широты
                            lonInput.value = city.lon; // Установить значение долготы
                            selectionMade.value = 'true'; // Set flag to true on selection
                            suggestions.innerHTML = ''; // Очистить список предложений
                            form.submit(); // Автоматически отправить форму
                        });
                        suggestions.appendChild(div);
                    });
                })
                .catch(error => console.error('Ошибка при получении данных:', error));
        } else {
            suggestions.innerHTML = ''; // Очистить, если ввода меньше 3 символов
        }
    });

    // Закрыть список автодополнения при клике вне поля
    document.addEventListener('click', function(event) {
        if (!suggestions.contains(event.target) && event.target !== cityInput) {
            suggestions.innerHTML = '';
        }
    });

    // Предотвратить отправку формы, если город не выбран из списка
    form.addEventListener('submit', function(event) {
        if (selectionMade.value !== 'true') {
            event.preventDefault();
            alert('Пожалуйста, выберите город из списка предложений.');
        }
    });
});
