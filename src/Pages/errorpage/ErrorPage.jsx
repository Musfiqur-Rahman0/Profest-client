import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import React from 'react';
import errorImg from "../../assets/errorimg.png"
import { useNavigate } from 'react-router';

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <Container className={"bg-white rounded-2xl mt-6 flex flex-col items-center justify-center py-16 "}>
            <figure> 
                <img src={errorImg} alt="" />
            </figure>
                <Button onClick={()=>navigate("/")}>Back Home</Button>
        </Container>
    );
};

export default ErrorPage;