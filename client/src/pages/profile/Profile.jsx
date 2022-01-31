import React,{useState,useEffect,useContext} from 'react'

import "./profile.css"
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import axios from 'axios'
import { useParams } from 'react-router';

import { AuthContext } from "../../context/AuthContext"; 

  const Profile = () => {
      const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
      const [user, setUser] = useState( {} );
      const { user: connectedUser } = useContext( AuthContext );
      const urlParam = useParams().username;
      const username = urlParam===connectedUser._id?connectedUser.username: urlParam;
      console.log( "Profile" );
      useEffect( () =>
      {
          const fetchUser = async () =>
          {
              const res = await axios.get( `/users?username=${ username }` )
              console.log( res.data );
              setUser( res.data );
          }
          fetchUser();
      },[username])
      return (
            <>
                <Topbar />
                <div className="profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img className="profileCoverImg"
                                  src={user.coverPicture
                                      ? PublicFolder + user.coverPicture
                                      : PublicFolder + "person/undefined"}
                                    alt="" />
                                <img className="profileUserImg"
                                      src={user.profilePicture
                                        ? PublicFolder+user.profilePicture
                                        : PublicFolder+"person/noAvatar.png"}
                                    alt="" />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">
                                    Maher SAM
                                </h4>
                                <span className="profileInfoDesc">
                                    Here we are !
                                </span>
                            </div>
                            </div>
                        <div className="profileRightBottom">
                        <Feed username={user.username} />
                          <Rightbar user={user}/>
                        </div>
                    </div>
                  
                </div>
           
            </>
        )
    
}

export default Profile;
