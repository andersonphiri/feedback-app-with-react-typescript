import React from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import Button from './shared/Button';

const Post = () => {
    const params = useParams();
    const idValue = params.id ? +params.id : -1;
    const navigate = useNavigate();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/navigatedtoexample')
    }

    if (idValue < 0 || idValue > 20000) {
        return <Navigate to='/notfound' replace={true} />
    } 
  return (
    <div>
        <h1>Post {params.id}</h1>
        <p>Name: {params.name}</p>
          <Button onClick={(e) => handleClick(e)} >
            Go TO Navigated example
        </Button>
    </div>
  )
}

export default Post