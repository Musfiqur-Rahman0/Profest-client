import React from 'react';
import logoImg from "../../assets/logo.png"
const Logo = () => {
    return (
        <div className='flex items-center '>
            <img src={logoImg} alt="profest logo"  className=''/>
            <h2 className='text-2xl font-bold mt-4'>Profest</h2>
        </div>
    );
};

export default Logo;