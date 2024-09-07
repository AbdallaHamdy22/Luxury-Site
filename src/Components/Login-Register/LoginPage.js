import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const supabase = createClient(
    "https://ndhpoinkldkazbkxoycw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kaHBvaW5rbGRrYXpia3hveWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2ODI1ODksImV4cCI6MjA0MTI1ODU4OX0.lenigHWSTrXPznPwHEhYR11rjzYxYl_eaKuS5l1SOIg"
);
const LoginPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Auth State Change Event: ", event);
            console.log("Session: ", session);

            if (event === 'SIGNED_OUT') {
                navigate('/join');
            } else if (event === 'SIGNED_IN') {
                navigate('/success');
            }
        });
    }, [supabase, navigate]);

    return (
        <>
            <Auth
                supabaseClient={supabase}
                theme='dark'
                providers={["facebook", "google"]}
            />
        </>
    );
};

export default LoginPage;
