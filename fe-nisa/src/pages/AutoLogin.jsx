import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AutoLogin = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const username = searchParams.get('username');
    const password = searchParams.get('password');

    if (username && password) {
      handleAutoLogin(username, password);
    } else {
      navigate('/login');
    }
  }, []);

  const handleAutoLogin = async (username, password) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/auto-login?username=${username}&password=${password}`);
      localStorage.setItem("access_token", data.access_token);
      
      Swal.fire({
        icon: "success",
        title: "Success Login",
      });
  
      navigate("/");
    } catch (error) {
      console.error('Auto-login error:', error);
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error || "Login failed",
        text: `Error details: ${error.message}`
      });
      navigate('/login');
    }
  };

  return <div>Logging in...</div>;
};

export default AutoLogin;