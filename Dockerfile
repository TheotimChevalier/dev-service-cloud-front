# build stage
FROM node:22-alpine AS builder
WORKDIR /usr/src/app

# installer les dépendances
COPY package*.json ./
RUN npm ci

# copier le code et build
COPY . .
RUN npm run build

# production stage - servir le dist avec nginx
FROM node:22-alpine
WORKDIR /usr/src/app

# installer un serveur HTTP simple (serve)
RUN npm install -g serve

# copier le build depuis le builder
COPY --from=builder /usr/src/app/dist ./dist

# exposer le port 8080 (requis par Cloud Run)
EXPOSE 8080

# démarrer le serveur sur le port 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
