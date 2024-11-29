import { User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function LoginButton() {
    const { authState, login, logout } = useAuth();
    return authState.isAuthenticated ? (
        <button 
      onClick={logout} 
      className="flex items-center p-2 bg-red-500 text-white rounded"
    >
      <User className="mr-2" /> Logout
    </button>
  ) : (
    <button 
      onClick={() => login({ 
        user: { name: 'John Doe' }, 
        token: 'dummy-token' 
      })} 
      className="flex items-center p-2 bg-blue-500 text-white rounded"
    >
      <User className="mr-2" /> Login
    </button>
    );
}