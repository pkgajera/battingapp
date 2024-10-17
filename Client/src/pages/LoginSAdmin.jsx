import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../context/AllContext';
import { toast } from 'react-toastify';

const LoginSAdmin = () => {

    const { storeTokenInLs } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sAdmin, setSAdmin] = useState({
        sAdminEmail: '',
        sAdminPass: ''
    })

    const handleChange = (e) => {
        setSAdmin({
            ...sAdmin,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async () => {
        try {
            setLoading(true);
            if (!sAdmin.sAdminEmail) {
                setError("Please , Enter Valid Email Address");
                setLoading(false);
            } else if (!sAdmin.sAdminPass) {
                setError("Please , Enter Valid Password");
                setLoading(false);
            } else {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/sAdmin/login`, sAdmin);
                if (response.data.status) {
                    storeTokenInLs(response.data.token);
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.message)
                }
                setError('');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log("Error from SAdmin Login : ", error);
        }
    }

    return (
        <div className={`w-[100vw] h-[100vh] flex justify-center items-center bg-[url(../assets/17933.jpg)] bg-cover bg-no-repeat bg-center `}>
            <div className='w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] flex flex-col justify-center items-center gap-5 border-[1px] p-5 bg-opacity-53 rounded-lg shadow-lg backdrop-blur-[10.8px] custom-backdrop'>
                <h2 className='font-semibold text-2xl'>Super Admin Login</h2>
                {/* <label htmlFor='sAdminEmail'>Email</label> */}
                <input
                    className='w-[90%] border-2 p-2 rounded-lg outline-none'
                    placeholder='Enter Email '
                    type="email"
                    id="sAdminEmail"
                    name="sAdminEmail"
                    value={sAdmin.sAdminEmail}
                    onChange={handleChange}
                    required
                />
                {/* <label htmlFor='sAdminPass'>Password</label> */}
                <input
                    className='w-[90%] border-2 p-2 rounded-lg outline-none'
                    placeholder='Enter Password'
                    type="password"
                    id="sAdminPass"
                    name="sAdminPass"
                    value={sAdmin.sAdminPass}
                    onChange={handleChange}
                    required
                />
                {error && <p className='text-red-600 text-left'>{error}</p>}
                <button className={`${loading ? "bg-gray-700" : "bg-black"}  text-white rounded-lg px-6 py-2 hover:bg-gray-700`} disabled={loading} onClick={handleLogin}>Login</button>
            </div>
        </div >
    )
}

export default LoginSAdmin