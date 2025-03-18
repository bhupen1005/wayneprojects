import { AuthContext } from "./context/AuthContext";
import AppRouter from "./AppRouter";

function App() {
  // Change role here for testing: 'admin' or 'user'
  const user = { role: "admin" };

  return (
    <AuthContext.Provider value={user}>
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
