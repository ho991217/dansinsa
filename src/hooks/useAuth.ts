import { useNavigate } from "react-router-dom";
import { useLoginState } from "../store/login-store";
import supabase from "../supabase";
import { AuthError } from "@supabase/supabase-js";

const useAuth = () => {
  const { loggedIn, setLoggedIn } = useLoginState();
  const navigate = useNavigate();

  const getUserId = async () => {
    try {
      const auth = await supabase.auth.getSession();
      if (!auth) throw new AuthError("No session");

      return auth.data.session?.user.id;
    } catch (error: unknown) {
      if (error instanceof AuthError) return false;
      throw error;
    }
  };

  const isLoggedIn = async () => {
    if (loggedIn) return true;
    try {
      await getUserId();
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

  return { getUserId, isLoggedIn, login, logout };
};

export default useAuth;
