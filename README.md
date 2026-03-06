# Cloud App Front

Projet React + Vite déployable sur Google Cloud Run.

## Installation et développement

```bash
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Build

```bash
npm run build
```

Cela génère le build dans le dossier `dist/`.

## Déploiement sur Google Cloud Run

### Option 1 : Via Cloud Build Trigger (automatique sur push)

1. Liez votre repo GitHub à Cloud Build :
```bash
gcloud builds triggers create github \
  --name=trigger-front-main \
  --repo-name=dev-service-cloud-front \
  --repo-owner=Theophane999 \
  --branch-pattern=main \
  --build-config=cloudbuild.yaml
```

2. Poussez sur `main` directement - Cloud Build se déclenche automatiquement :
```bash
git push origin main
```

### Option 2 : Build manuel

```bash
gcloud builds submit --config=cloudbuild.yaml
```

## Architecture

- **Dockerfile** : Build multi-stage (Node -> serveur statique sur port 8080)
- **cloudbuild.yaml** : Pipeline GCP pour build, push et déploiement sur Cloud Run
- **vite.config.js** : Configuration Vite pour build optimisé

## En production

L'app est servie via `serve` sur le port 8080 (requis par Cloud Run). Les logs sont disponibles dans GCP Cloud Run Console.
