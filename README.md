# CampusRate

## Description

CampusRate est une API REST qui permet de consulter des endroits et des services du campus et de publier des appréciations avec une note.

Le projet est réalisé individuellement dans le cadre du TP1 du cours 420-514.

## Technologies

- NestJS
- TypeScript
- Node.js
- JSON
- Swagger / OpenAPI
- Postman

## Fonctionnalités

L'API permet de :

- créer, lister et consulter des endroits;
- modifier et supprimer des endroits lorsque les règles le permettent;
- créer et consulter des appréciations associées à un endroit;
- modifier et supprimer des appréciations;
- calculer la note moyenne et le nombre d'appréciations d'un endroit;
- filtrer les endroits par catégorie;
- paginer la liste des endroits;
- valider les données reçues;
- conserver les données dans un fichier JSON;
- gérer les erreurs avec le format Problem Details.

## Installation

Cloner le dépôt et installer les dépendances :

npm install

## Configuration

Créer un fichier .env à la racine du projet à partir de .env.example.

Les variables suivantes sont nécessaires :

PORT=3000
DATA_FILE_PATH=./data/campusrate.json

### Variables de configuration

- PORT : port utilisé par l'API.
- DATA_FILE_PATH : chemin vers le fichier JSON utilisé pour la persistance des données.

Le fichier .env ne doit pas être versionné.

## Démarrage

Pour démarrer l'application en mode développement :

npm run start:dev

L'API est accessible à :

http://localhost:3000/api/v1

### Swagger

Swagger UI est disponible à :

http://localhost:3000/docs

La spécification OpenAPI est disponible à :

http://localhost:3000/docs-json

## Scripts

Compiler le projet :

npm run build

Démarrer en mode développement :

npm run start:dev

## Structure du projet

src/
  common/                 # Fonctionnalités partagées
    filters/            # Gestion des erreurs
    interfaces/         # Interfaces communes
    persistence/        # Persistance JSON
  places/                 # Fonctionnalités liées aux endroits
  reviews/                # Fonctionnalités liées aux appréciations
  app.module.ts
  configure-swagger.ts
  main.ts


Les contrôleurs gèrent les requêtes HTTP, les services contiennent la logique métier et `JsonRepository` s'occupe de la lecture et de l'écriture du fichier JSON.

## Contrat de l'API

L'API utilise un versionnement majeur dans l'URI :


/api/v1


Les ressources principales sont :


GET    /api/v1/places
POST   /api/v1/places
GET    /api/v1/places/:id
PATCH  /api/v1/places/:id
DELETE /api/v1/places/:id

POST   /api/v1/reviews
GET    /api/v1/reviews
GET    /api/v1/reviews/:id
PATCH  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
GET    /api/v1/reviews/places/:placeId


La liste des endroits accepte les paramètres de requête suivants :

- category : filtre par catégorie;
- page : numéro de page;
- limit : nombre d'éléments par page.

La valeur maximale de limit est de 50.

## Persistance des données

Les données sont conservées dans un fichier JSON local dont le chemin est défini par `DATA_FILE_PATH`.

Le fichier est initialisé lorsqu'il est absent. Un fichier JSON invalide produit une erreur contrôlée.

Les données restent disponibles après un redémarrage de l'application.

## Gestion des erreurs

Les erreurs utilisent le type de contenu :

application/problem+json

Elles suivent le format Problem Details :

{
  "type": "...",
  "title": "...",
  "status": 400,
  "detail": "...",
  "instance": "..."
}

Les erreurs de validation, les ressources inexistantes, les conflits et les erreurs internes sont traités par un filtre global.

## Vérification manuelle

L'API a été vérifiée avec Swagger UI et Postman.

La collection Postman se trouve dans le dossier `postman/`.

## Limites connues

La persistance est basée sur un fichier JSON local. Elle est adaptée au contexte du TP, mais ne convient pas à une application avec plusieurs instances ou un grand volume de données.