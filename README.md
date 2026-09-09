# CampusRate

## Description

CampusRate est une API REST pour consulter des endroits et services du campus et de publier des appréciations accompagnées d'une note.

## Cadre

Ce projet est réalisé individuellement dans le cadre du TP1 - CampusRate du cours 420-514.

## Technologies

* NestJS
* TypeScript
* Node.js
* JSON
* Swagger / OpenAPI
* Postman

## Fonctionnalités

L'API permettra de :

* Créer, lister et consulter des endroits
* Modifier et supprimer des endroits
* Publier et lister des appréciations associées à un endroit
* Consulter, modifier et supprimer une appréciation
* Filtrer et paginer la liste des endroits
* Valider les données reçues et appliquer les règles métier
* Persister les données dans un fichier JSON
* Gérer les erreurs

## Installation

Cloner le dépôt, puis installer les dépendances avec npm install


## Configuration

Créer un fichier .env à la racine du projet ou copier le fichier .env.example

Les variables de configuration PORT et DATA_FILE_PATH sont nécessaires.

### Descriptions

* PORT	- Port utilisé par l'API
* DATA_FILE_PATH	- Chemin vers le fichier JSON utilisé pour la persistance des données

## Démarrage

Pour démarrer l'application en mode développement :

npm run start:dev

L'API sera accessible à :

http://localhost:3000/api/v1

La documentation Swagger sera accessible à partir de l'interface Swagger UI.

http://localhost:3000/docs
http://localhost:3000/docs/openapi.json

Scripts disponibles
npm run build (compile l'application)
npm run lint (vérifie le code avec ESLint)

## Structure du projet

Le projet est organisé comme ceci :

src/
├── common/              # Fonctionnalités partagées
├── places/              # Fonctionnalités liées aux endroits
├── reviews/             # Fonctionnalités liées aux appréciations
├── app.module.ts
├── main.ts
└── configure-swagger.ts

## Versionnement de l'API

L'API utilise un versionnement majeur dans l'URI.

## Persistance des données

Les données de CampusRate sont conservées dans un fichier JSON
L'emplacement de ce fichier est défini par la variable d'environnement DATA_FILE_PATH
L'application devra initialiser correctement le fichier lorsqu'il est absent et gérer les fichiers JSON invalides avec une erreur contrôlée

## Gestion des erreurs

Les erreurs de l'API utilisent le type de contenu :

application/problem+json

Elles suivent le format Problem Details :

{
  "type": "...",
  "title": "...",
  "status": 400,
  "detail": "...",
  "instance": "..."
}

## Vérification manuelle

Les fonctionnalités de l'API seront vérifiées manuellement à l'aide de Swagger UI et/ou Postman
