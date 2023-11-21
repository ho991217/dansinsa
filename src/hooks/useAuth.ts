import { useNavigate } from "react-router-dom";
import { useLoginState } from "../store/login-store";
import supabase from "../supabase";
import { AuthError } from "@supabase/supabase-js";

const useAuth = () => {
  const { loggedIn, setLoggedIn } = useLoginState();
  const navigate = useNavigate();

  const isLoggedIn = async () => {
    if (loggedIn) return true;
    try {
      await supabase.auth.getSession();
      return true;
    } catch (error: unknown) {
      if (error instanceof AuthError) return false;
      throw error;
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      if (loggedIn) return;
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoggedIn(true);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AuthError) alert(error.message);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AuthError) alert(error.message);
    }
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
