IMPORTANT: Do NOT copy node_modules from an older version of this project.
Open PowerShell in this frontend folder and run:
  npm install
  npm run dev
If npm install reports an optional dependency/native binding error, run:
  Remove-Item -Recurse -Force node_modules
  Remove-Item -Force package-lock.json
  npm cache verify
  npm install
  npm run dev
Backend must run separately on http://127.0.0.1:8001.
