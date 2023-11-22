import { useNavigate } from "react-router-dom";
import { useLoginState } from "../store/login-store";
import supabase from "../supabase";
import { AuthError } from "@supabase/supabase-js";

const useAuth = () => {
  const { loggedIn, setLoggedIn } = useLoginState();
  const navigate = useNavigate();

  const getUserId = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return user?.id;
    } catch (error: unknown) {
      alert(error);
    }
  };

  const isLoggedIn = async () => {
    if (loggedIn) return true;

    try {
      const id = await getUserId();
      if (!id) return false;

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
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error);
        return;
      }
      if (data.session?.access_token) {
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error: unknown) {
      if (error instanceof AuthError) console.log(error.message);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AuthError) console.log(error.message);
    }
  };

  return { getUserId, isLoggedIn, login, logout };
};

export default useAuth;
