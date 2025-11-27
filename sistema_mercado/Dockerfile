FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# dependências do sistema
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev gcc netcat-openbsd \
    && apt-get clean

COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["bash", "-c", "python manage.py runserver 0.0.0.0:8000"]
