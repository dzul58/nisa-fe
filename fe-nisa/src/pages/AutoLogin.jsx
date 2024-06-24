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
      // Decode the password parameter as it might contain "&amp;"
      const decodedPassword = password.replace(/&amp;/g, '&');
      
      // Encode the username and decoded password
      const encodedUsername = encodeURIComponent(username);
      const encodedPassword = encodeURIComponent(decodedPassword);

      const { data } = await axios.get(`http://192.168.202.166:8000/auto-login?username=${encodedUsername}&password=${encodedPassword}`);
      localStorage.setItem("access_token", data.access_token);

      Swal.fire({
        icon: "success",
        title: "Berhasil Login",
      });

      navigate("/");
    } catch (error) {
      console.error('Kesalahan auto-login:', error);
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error || "Login gagal",
        text: `Detail kesalahan: ${error.message}`
      });
      navigate('/login');
    }
  };

  return <div>Sedang login...</div>;
};

export default AutoLogin;