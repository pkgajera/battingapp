import { createContext, useContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const api = process.env.REACT_APP_BACKEND_URL;
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('authKey')) || '');
    const [allAdmin, setAllAdmin] = useState([]);

    const Authorization = token;

    const storeTokenInLs = (token) => {
        localStorage.setItem('authKey', JSON.stringify(token));
        setToken(token);
    }

    const isLoggedIn = !!token;

    const logout = () => {
        localStorage.removeItem('authKey');
        setToken('');
    }

    const getAllAdmin = async () => {
        try {
            const response = await axios.get(`${api}/api/admin/get`, {
                headers: {
                    'Authorization': token,
                }
            })

            if (response.data.status) {
                setAllAdmin(response.data.data);
            }
        } catch (error) {
            console.log("Error while fetching all admin");
        }
    }

    const providerValue = {
        token,
        isLoggedIn,
        Authorization,
        storeTokenInLs,
        logout,
        getAllAdmin,
        allAdmin
    }

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext);
}