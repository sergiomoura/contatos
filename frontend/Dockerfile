# Usando uma imagem Node.js para o ambiente de desenvolvimento
FROM node:18 AS dev

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e instalar dependências
# COPY package.json package-lock.json ./

# Copiar o restante do código (exceto node_modules, que será instalado no container)
COPY . .
RUN npm install


# Expor a porta usada pelo Angular (geralmente 4200)
EXPOSE 4200

# Comando para rodar o servidor de desenvolvimento
CMD ["npm", "start"]
