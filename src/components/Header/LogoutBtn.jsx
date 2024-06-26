import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authServices from "../../appwrite/auth"

function LogoutBtn(){

    const dispatch = useDispatch();

    const logoutHandler = () => {
        // in oder to check the user is logedout or not the logout() is asscessed and the authservices 
        // returns the promises that's why .then() is used
        authServices.logout().then(
            dispatch(logout())
        );
    }

    return (
        <button 
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
        onClick={logoutHandler}
        >
        Logout
        </button>
    )
}

export default LogoutBtn