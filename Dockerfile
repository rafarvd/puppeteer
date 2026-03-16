FROM ghcr.io/puppeteer/puppeteer:latest

WORKDIR /usr/src/app

# Copia só package.json para instalar dependências primeiro
COPY package*.json ./

# Ajusta permissões para pptruser
RUN chown -R pptruser:pptruser /usr/src/app

# Muda para usuário pptruser
USER pptruser

# Instala dependências
RUN npm install --unsafe-perm

# Copia o restante do código
COPY --chown=pptruser:pptruser . .

CMD ["node", "index.js"]
