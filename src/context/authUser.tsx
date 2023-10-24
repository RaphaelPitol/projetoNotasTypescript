import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../service/api";

const AuthContext = createContext({});

interface ChildrenInterface {
  children: ReactNode;
}

interface SignInInterface {
  email: string;
  password: string;
}

interface SessionResponse {
  user: object;
  token: string;
}

function AuthProvider({ children }: ChildrenInterface) {
  const [data, setData] = useState([]);
// console.log(data.user.name)
  async function signin(data: SignInInterface) {
    try {
      const response = await api.post("/sessions", {
        email: data.email,
        password: data.password,
      });
     //  setData(response.data)
      const { user, token } = response.data;
      localStorage.setItem("@blocoDeNotas:user", JSON.stringify(user.name));
      localStorage.setItem("@rocketnotes:token", token);
      setData({ user, token });

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error: unknown) {
      alert("Erro Interno");
    }
  }

  function signOut() {
    localStorage.clear();

    setData({});
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
    <AuthContext.Provider value={{ signin, signOut, user: data.user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
