import { Outlet } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
