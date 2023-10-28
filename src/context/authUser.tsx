import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../service/api";
import Swal from 'sweetalert2'

interface UserAuth{
  user?:{name: string},
  signin:(data: SignInInterface)=> void
  signOut: () => void
}
const AuthContext = createContext({} as UserAuth);

interface ChildrenInterface {
  children: ReactNode;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface SessionResponse {
  user: {
    name: string
  },
  token: string;
}


function AuthProvider({ children }: ChildrenInterface) {
  const [data, setData] = useState<SessionResponse | null>(null);
  


  async function signin(data: SignInInterface) {
    try {
      const response = await api.post("/sessions", {
        email: data.email,
        password: data.password,
      });
  
      const { user, token } = response.data;
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);
      
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ user, token });
    } catch (error: unknown) {
      alert("Erro Interno");
    }
  }

  function signOut() {

    Swal.fire({
      text: "Você realmente deseja sair?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#dd6633',
      confirmButtonText: 'Sair!',
      cancelButtonText: 'Cancelar'

    }).then((response) => {
      if (response.isConfirmed) {
        localStorage.removeItem("@rocketnotes:user");  
        localStorage.removeItem("@rocketnotes:token");
        setData(null);  // Limpar o estado
        delete api.defaults.headers.common["Authorization"]; 

      }

    });


   
   
    
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider value={{user: data?.user, signin, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
