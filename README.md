# CampusRate

## Description

CampusRate est une API REST qui permet de consulter des endroits et des services du campus et de publier des appréciations avec une note.

Le projet est réalisé individuellement dans le cadre des TPs du cours 420-514.

## Technologies

- NestJS
- TypeScript
- Node.js
- MongoDB + Mongoose
- Swagger / OpenAPI
- Postman
- Helmet
- Throttling

## Fonctionnalités

- création, consultation, modification et suppression de lieux;
- création, consultation, modification et suppression d'avis;
- calcul automatique de la moyenne et du nombre d'avis;
- filtrage et pagination des lieux;
- validation globale via DTO et ValidationPipe;
- stockage des données dans MongoDB;
- protection HTTP avec CORS, Helmet et rate limiting;
- gestion standardisée des erreurs au format Problem Details.

## Installation

Cloner le dépôt et installer les dépendances :

npm install

Créer un fichier .env à partir de .env.example.

## Configuration

Les variables nécessaires sont :

Les variables suivantes sont nécessaires :

PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/campusrate
CORS_ORIGINS=http://localhost:3000,http://localhost:4200
THROTTLE_TTL=60
THROTTLE_LIMIT=120

## Démarrage

Pour démarrer l'application en mode développement :

npm run start:dev

L'API est accessible à :

- http://localhost:3000/api/v1
- Swagger : http://localhost:3000/docs

## Contrat principal

- GET /api/v1/places
- POST /api/v1/places
- GET /api/v1/places/:id
- PATCH /api/v1/places/:id
- DELETE /api/v1/places/:id
- POST /api/v1/reviews
- GET /api/v1/reviews
- GET /api/v1/reviews/:id
- PATCH /api/v1/reviews/:id
- DELETE /api/v1/reviews/:id
- GET /api/v1/reviews/places/:placeId

## Vérification

Les validations de base ont été exécutées avec succès :

npx vitest run src/places/places.service.spec.ts src/reviews/reviews.service.spec.ts
npm run lint


La compilation a aussi été validée :

npx -y node@22.22.3 ./node_modules/@nestjs/cli/bin/nest.js build


## Limites connues

- Aucune authentification JWT n'est encore implémentée.
- Les éléments optionnels comme HTTPS local ou RBAC ne sont pas requis pour le TP de base.