import React, { Fragment, useEffect,  useState } from 'react'
import "./UpdateProfile.css"
import {  useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from "@mui/icons-material/Face"
import {useDispatch, useSelector} from 'react-redux'
import {clearErrors, loadUser, updateProfile} from '../../actions/userAction'
import { useAlert } from 'react-alert';
import { Loader } from '../layout/Loader/Loader';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import MetaData from '../layout/MetaData';




const UpdateProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {user} = useSelector(state=>state.user)
    const {error,loading, isUpdated} = useSelector(state => state.profile)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avtar, setAvtar] = useState("");
    const [avtarPreview, setAvtarPreview] = useState("/Profile.png")

    const updateProfileSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avtar",avtar);
        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e)=>{
            const reader = new FileReader();

            reader.onload = ()=>{
                if(reader.readyState === 2 ){
                    setAvtarPreview(reader.result)
                    setAvtar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        
    }

    useEffect(() => {
        if(user){
            setName(user.name)
            setEmail(user.email)
            setAvtarPreview(user.avtar.url)
        }
      if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success("Profile Updated Successfully")
        dispatch(loadUser())
        navigate("/account")
        
        dispatch({type:UPDATE_PROFILE_RESET})
    }
    }, [dispatch,error,alert,navigate,user,isUpdated])
    

  return (
    <>
    {loading ? <Loader /> :
    <Fragment>
    <MetaData title="Update Profile" />
    <div className='updateProfileContainer'>
    <div className='updateProfileBox'>
        <h2 className='updateProfileHeading'>Update Profile</h2>
    <form className='updateProfileForm'  encType='multipart/form-data' onSubmit={updateProfileSubmit}>
        <div className='updateProfileName'>
                <FaceIcon />
                <input
                type='text'
                placeholder='Name'
                required
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className='updateProfileEmail'>
                <MailOutlineIcon />
                <input
                type='email'
                placeholder='Email'
                required
                name='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div id='updateProfileImage'>
                <img src={avtarPreview} alt='Avtar Preview' />
                <input 
                type='file'
                name='avtar'
                accept='image/*'
                onChange={updateProfileDataChange}
                />

            </div>
            <input type='submit' value="Update" className='updateProfileBtn' />
        </form>

    </div>
    </div>
    </Fragment>}
    </>
  )
}

export default UpdateProfile