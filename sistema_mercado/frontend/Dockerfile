# sistema_mercado/frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala dependências
RUN npm install

# Copia o código fonte
COPY . .

EXPOSE 3000

CMD ["npm", "start"]