//client/src/contexts/authentication.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = React.createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  const updateUserContext = (userData) => {
    setState((prevState) => ({ ...prevState, user: userData }));
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      setState((prev) => ({...prev, getUserLoading: true}));

      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setState((prev) => ({
          ...prev,
          getUserLoading: false,
          user: null,
        }));
        return;
      }

      // ดึงข้อมูล profile จาก table "users"
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        setState((prev) => ({
          ...prev,
          getUserLoading: false,
          error: profileError.message,
        }));
        return;
      }

      updateUserContext(profile);
      setState((prev) => ({
        ...prev,
        getUserLoading: false,
        error: null,
      }));
    }
    
    getCurrentUser();
  },[])

  // using Superbase API
  const register = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post(`${API_BASE_URL}/auth/register`, data);
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      return { success: true };
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.response?.data?.error || "Registration failed",
      }));
      return { error: state.error };
    }
  };

  const login = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const res = await axios.post(`${API_BASE_URL}/auth/login`, data, {
        withCredentials: true,
      });

      const { session } = res.data;

      setState((prevState) => ({ ...prevState, loading: false, error: null }));

      // Step 1: set Supabase session (จำเป็น)
      const { error: setSessionError } = await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      if (setSessionError) {
        throw new Error(setSessionError.message);
      }

      // Step 2: ดึง user จาก Supabase
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(userError?.message || "Cannot fetch user");
      }

      // Step 3: ดึง profile จาก Supabase DB
      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      // Step 4: อัปเดต context
      updateUserContext(userProfile);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: null,
      }));

      return { success: true };
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.response?.data?.error || "Login failed",
      }));
      return { error: error.response?.data?.error || "Login failed" };
    }
  };

  const logout = async () => {
  await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
    withCredentials: true
  });
  await supabase.auth.signOut();
  updateUserContext(null);
};

  return (
    <AuthContext.Provider
      value={{
        state,
        register,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
