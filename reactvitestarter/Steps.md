#

## ✅ How to Force Install **React 18.2.0** with Vite

Follow these steps to downgrade React back to **18.2.0** after Vite setup:

---

### 1️⃣ Create the project (Vite will install the latest by default):
```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
```

---

### 2️⃣ Uninstall the newer React version:
```bash
npm uninstall react react-dom
```

---

### 3️⃣ Install **React 18.2.0** specifically:
```bash
npm install react@18.2.0 react-dom@18.2.0
```

---

### 4️⃣ Verify your `package.json`
It should now show:
```json
"dependencies": {
  "react": "18.2.0",
  "react-dom": "18.2.0"
}
```

---

### 5️⃣ Run the project:
```bash
npm run dev
```

✅ Now, your Vite project runs **React 18.2.0**.

---

## 💡 Pro Tip:
If you plan to use TypeScript:
```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm uninstall react react-dom
npm install react@18.2.0 react-dom@18.2.0
