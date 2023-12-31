

import { useState,useEffect } from "react";

import { useSelector, useDispatch } from "react-redux/es/exports";
const Profile=()=>{

    const [profile, setProfile] = useState({username:"",email:""});
    const user = useSelector((state) => state.users.userData);

    useEffect(() => {
        if(user.userData.username){
            setProfile({username:user.userData.username,email:user.userData.email})
        }
      }, [user]);
    return(
        <>
        <h2>username:{profile.username}</h2>
        <h2>email:{profile.email}</h2>
        </>
    )
}

export default Profile