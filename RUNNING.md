# Tripplankaro – Running Instructions

## 1. Backend (FastAPI)

Open Terminal 1:

### Windows PowerShell
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

If PowerShell blocks activation, you can run the backend without activation after installing the requirements into your Python environment:
```powershell
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

Backend check: http://127.0.0.1:8001/api/health

## 2. Frontend (React + Vite)

Open Terminal 2:

```powershell
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally:
http://localhost:5173

The Vite development server proxies `/api` requests to the FastAPI server on port 8001.

## 3. Admin Portal

Click the lock icon in the navbar.

Default local-development passcode:
```text
tripplan2026
```

For a different backend admin key, set `TRIPPLANKARO_ADMIN_KEY` before starting FastAPI. The frontend currently uses the default key for this local/basic version.

## 4. Production build

```powershell
cd frontend
npm run build
npm run preview
```

## Important

Do not copy the old `node_modules` folder from the original ZIP. It contained platform-specific installed binaries. Run `npm install` on the machine where you are running the project.
