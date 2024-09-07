import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Move the Supabase client creation outside the component to prevent it from being recreated on each render
const supabase = createClient(
  "https://ndhpoinkldkazbkxoycw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaHBvaW5rbGRrYXpia3hveWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2ODI1ODksImV4cCI6MjA0MTI1ODU4OX0.lenigHWSTrXPznPwHEhYR11rjzYxYl_eaKuS5l1SOIg"
);

const LoginSuccess = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        console.log(data.user);
        setUser(data.user);
      }
      if (error) {
        console.error(error);
      }
    }
    getUserData();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate('/join');
    } else {
      console.error('Error signing out:', error);
    }
  }

  return (
    <>
      <h1>Success</h1>
      <p>Welcome, {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
};

export default LoginSuccess;
