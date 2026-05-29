# Indoor Position System

A comprehensive indoor positioning system built with Django and React.

## Project Structure

```
indoor system/
├── indoor_system/      # Django project directory
├── positioning/        # Django app for positioning logic
├── ip-frontend/        # React + Vite frontend
│   └── frontend/       # Create React App frontend (legacy)
├── ml_model/           # Machine learning model files
├── manage.py           # Django management script
└── db.sqlite3          # SQLite database
```

## Backend Setup (Django)

1. Activate the virtual environment:
   ```bash
   venv\Scripts\activate
   ```

2. Install dependencies (if not already installed):
   ```bash
   pip install django djangorestframework django-cors-headers joblib numpy
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Start the development server:
   ```bash
   python manage.py runserver
   ```

## Frontend Setup (React + Vite)

1. Navigate to ip-frontend directory:
   ```bash
   cd ip-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Vite (and Create React App for legacy)
- **Machine Learning**: scikit-learn, joblib
