# Weather Forecast Web Application
Разработка велась в ветке dev

## Описание

Это веб-приложение позволяет пользователям вводить название города и получать актуальный прогноз погоды в этом городе. Прогноз предоставляется в удобочитаемом формате с использованием API OpenWeatherMap.

### Функции

- **Прогноз погоды**: Позволяет пользователям получать актуальный прогноз погоды по введенному названию города.
- **Автодополнение**: Подсказки при вводе названия города.
- **Dockerfile**: Предоставлен Dockerfile для создания образа и запуска контейнера, что упрощает развертывание приложения.

## Используемые технологии

- **Django**: Веб-фреймворк для создания веб-приложения.
- **OpenWeatherMap API**: Для получения данных о погоде.
- **Docker**: Для контейнеризации приложения.
- **HTML/CSS**: Для создания удобного интерфейса пользователя.
- **JavaScript**: Для реализации автодополнения.

### Требования

- Docker установлен на вашей машине.

## Установка и запуск

Следуйте этим инструкциям для запуска приложения на вашем локальном компьютере и перейдите в браузере по адресу http://127.0.0.1:8000/

   ```bash
   git clone https://github.com/qarasuv/weather-app.git
   cd weather-app
   git checkout dev
   sudo docker build -t weather-app .
   sudo docker run -d -p 8000:8000 weather-app
