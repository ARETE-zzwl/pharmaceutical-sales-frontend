import axios from 'axios';

export function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/login";
    } else {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}