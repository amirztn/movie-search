# Étape 1 : build de l'app
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Vite lit la clé au moment du build : on la passe en argument.
ARG VITE_OMDB_API_KEY
ENV VITE_OMDB_API_KEY=$VITE_OMDB_API_KEY
RUN npm run build

# Étape 2 : serveur nginx qui sert les fichiers statiques
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
