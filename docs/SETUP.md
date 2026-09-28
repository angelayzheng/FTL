# Setup

## Prerequisites

Install the following before setting up the repository:

- Git
- Node.js and npm
- Python 3.14 or newer

Verify the installations from Bash:

```bash
git --version
node --version
npm --version
python --version
```

## First-time setup

Clone the repository and open its root directory:

```bash
git clone <repository-url>
cd bam-boo
```

### Frontend

Install the frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

The frontend uses Tailwind CSS through the Vite plugin. Tailwind is installed with the frontend dependencies, so no separate CSS setup command is required after `npm install`.

### Backend

Create the local Python virtual environment and install the backend dependencies:

```bash
python -m venv backend\.venv
backend/.venv/bin/python -m pip install --upgrade pip
backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

Initialize the local SQLite database:

```bash
backend/.venv/bin/python backend/manage.py migrate
```

The virtual environment and SQLite database are local development files and are excluded from Git.

## Running locally

Run the backend from the repository root in one Bash terminal:

```bash
backend/.venv/bin/python backend/manage.py runserver
```

The backend runs at <http://127.0.0.1:8000>. Its health endpoint is <http://127.0.0.1:8000/api/health/>.

### View persisted data

The SQLite database is stored at `backend/db.sqlite3`. To view the saved counter in a browser, create a local Django admin account:

```bash
backend/.venv/bin/python backend/manage.py createsuperuser
```

With the backend running, open <http://127.0.0.1:8000/admin/> and sign in. The `Counter` entry shows the current value and last update time.

For direct SQLite inspection, use a SQLite viewer in your editor or run:

```bash
backend/.venv/bin/python backend/manage.py dbshell
```

Then query the counter with:

```sql
SELECT key, value, updated_at FROM counter_counter;
```

Run the frontend from the repository root in a second Bash terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at <http://localhost:5173>.

## Validation

Run Django’s checks:

```bash
backend/.venv/bin/python backend/manage.py check
```

Build the frontend for production:

```bash
cd frontend
npm run build
```

When adding frontend UI, use Tailwind utility classes in React components. Keep the Tailwind import in `frontend/src/index.css` and update `frontend/vite.config.js` if the styling build integration changes.
