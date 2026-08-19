# Roadies

Landing page for Roadies — an all-in-one event planning and management platform.

## Stack

- **Frontend:** React + Vite + Tailwind CSS (`frontend/`)
- **Backend:** Django + Django REST Framework (`backend/`)
- **Database:** PostgreSQL, database name `Roadies`

## Frontend

```
cd frontend
npm install
npm run dev
```

Runs at http://localhost:5173.

## Backend

1. Install PostgreSQL and create the database:

   ```sql
   CREATE DATABASE "Roadies";
   ```

2. Set up the environment:

   ```
   cd backend
   pip install -r requirements.txt
   copy .env.example .env                # then edit DB_USER / DB_PASSWORD to match your Postgres install
   ```

3. Run migrations and start the server:

   ```
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

Runs at http://localhost:8000. Health check: http://localhost:8000/api/health/.

The frontend dev server (port 5173) is already allowed via CORS in `backend/roadies_backend/settings.py`.
