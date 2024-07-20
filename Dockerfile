FROM python:3.11

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ENV API_KEY=12933cb6ced2eea2c92636a5269a7d23

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000
