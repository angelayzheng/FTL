# Setup

## Prerequisites

Install the following before setting up the repository:

- Git
- Node.js and npm
- Python 3.14 or newer

Verify the installations:

**Linux / macOS:**
```bash
git --version
node --version
npm --version
python3 --version
```

**Windows (CMD / PowerShell):**
```cmd
git --version
node --version
npm --version
python --version
```

---

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

Create the local Python virtual environment, install dependencies, and run initial migrations:

**Linux / macOS:**
```bash
python3 -m venv backend/.venv
backend/.venv/bin/python -m pip install --upgrade pip
backend/.venv/bin/python -m pip install -r backend/requirements.txt
backend/.venv/bin/python backend/manage.py migrate
```

**Windows (CMD / PowerShell):**
```cmd
python -m venv backend\.venv
backend\.venv\Scripts\python.exe -m pip install --upgrade pip
backend\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
backend\.venv\Scripts\python.exe backend\.venv\Scripts\python.exe backend/manage.py migrate
```

*(Note: On Windows PowerShell/CMD, you can also activate the virtual environment with `backend\.venv\Scripts\activate` to simplify command execution).*

The virtual environment and SQLite database are local development files and are excluded from Git.

---

## Running locally

Run the backend from the repository root in the first terminal:

**Linux / macOS:**
```bash
backend/.venv/bin/python backend/manage.py runserver
```

**Windows (CMD / PowerShell):**
```cmd
backend\.venv\Scripts\python.exe backend\manage.py runserver
```

The backend runs at <http://127.0.0.1:8000>. Its health endpoint is <http://127.0.0.1:8000/api/health/>.

### View persisted data

The SQLite database is stored at `backend/db.sqlite3`. To view the saved counter in a browser, create a local Django admin account:

**Linux / macOS:**
```bash
backend/.venv/bin/python backend/manage.py createsuperuser
```

**Windows (CMD / PowerShell):**
```cmd
backend\.venv\Scripts\python.exe backend\manage.py createsuperuser
```

With the backend running, open <http://127.0.0.1:8000/admin/> and sign in. The `Counter` entry shows the current value and last update time.

For direct SQLite inspection, run:

**Linux / macOS:**
```bash
backend/.venv/bin/python backend/manage.py dbshell
```

**Windows (CMD / PowerShell):**
```cmd
backend\.venv\Scripts\python.exe backend\manage.py dbshell
```

Then query the counter:

```sql
SELECT key, value, updated_at FROM counter_counter;
```

Run the frontend from the repository root in a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs at <http://localhost:5173>.

---

## Validation

Run Django’s checks:

**Linux / macOS:**
```bash
backend/.venv/bin/python backend/manage.py check
```

**Windows (CMD / PowerShell):**
```cmd
backend\.venv\Scripts\python.exe backend\manage.py check
```

Build the frontend for production:

```bash
cd frontend
npm run build
```

When adding frontend UI, use Tailwind utility classes in React components. Keep the Tailwind import in `frontend/src/index.css` and update `frontend/vite.config.js` if the styling build integration changes.
