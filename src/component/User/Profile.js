import React, { useEffect } from 'react'
import './Profile.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Loader } from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData'

const Profile = () => {
    const {isAuthenticated,loading,user }= useSelector((state)=> state.user);
    // console.log('user', isAuthenticated,loading,user)
    const navigate = useNavigate();

    // useEffect(() => {
    //   if(isAuthenticated === false){
    //     navigate("/login")
    //   }
    // }, [isAuthenticated])
    useEffect(() => {
        if (isAuthenticated === false) {
          navigate("/login");
        }
      }, [navigate, isAuthenticated]);
    

  return (
    <>
    {loading ? (<Loader />):(
        user && (
            <>
        <MetaData title={`${user?.name}'s Profile`} />
        <div className="profileContainer" >
            <div>
                <h1>My Profile</h1>
                <img src={user.avtar.url} alt={user?.name} />
                <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user?.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user?.email}</p>
                </div>
                <div>
                    <h4>Joined on</h4>
                    <p>{String(user?.createdAt).substring(0,10)}</p>
                </div>
    
                <div>
                <Link to="./orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
                </div>
            </div>
    
    
    
        </div>
        </>
        )
    )}
    </>
  )
}

export default Profile