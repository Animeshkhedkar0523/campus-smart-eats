# Campus Smart Eats - Backend

This directory contains the Express + TypeScript backend for Campus Smart Eats.

## Environment
Create a `.env` file in this folder with:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/campus_smart_eats?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
PORT=5000
SEED_ADMIN_EMAIL=admin@campussmateats.com
SEED_ADMIN_PASSWORD=AdminPass123!
```

## Scripts
- `npm run dev` - run server in dev mode (ts-node + nodemon)
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - run compiled server
- `npm run seed:admin` - create an admin user using env values

## Deploy
See project root README for deployment recommendations. Render / Railway / Heroku are recommended hosts.
