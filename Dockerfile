# sistema_mercado/Dockerfile
FROM python:3.11-slim

# Evita que o Python grave arquivos .pyc e garante logs em tempo real
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# Instala dependências do sistema necessárias para o psycopg2 (Postgres)
RUN apt-get update && apt-get install -y libpq-dev gcc

# Copia e instala dependências do Python
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt
RUN pip install django-cors-headers psycopg2-binary

# Copia o restante do projeto
COPY . /app/

# Expõe a porta
EXPOSE 8000

# Comando para rodar
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]