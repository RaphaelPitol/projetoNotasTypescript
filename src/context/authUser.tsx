import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { api } from "../service/api";

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
    localStorage.removeItem("@rocketnotes:user");  // Mais específico do que clear()
    localStorage.removeItem("@rocketnotes:token");
    setData(null);  // Limpar o estado
    delete api.defaults.headers.common["Authorization"]; 
   
  }

  useEffect(() => {
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");
    console.log(user)

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
