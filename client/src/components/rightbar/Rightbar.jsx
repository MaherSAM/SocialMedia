import {Link} from "react-router-dom"

import "./rightbar.css";
import Online  from "../online/Online"
import { Add, Remove } from '@material-ui/icons';

import { Users } from "../../dummyData";
import { useEffect,useState } from "react";
import { getFriends,follow,Unfollow } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar( { user } )
{

  const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser,dispatch } = useContext( AuthContext );
  console.log( currentUser );
  const HomeRightbar = () =>
  {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    

    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {
            Users.map( u => (
              <Online key={u.id} user={u}/>
            ))
          }
       
        </ul>
      </>
    );
  };

  const ProfileRightbar = () =>
  {
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const [followed, setFollowed] = useState( currentUser.followings?.includes( user?._id ) );
    const [friends, setFriends] = useState( [] );
   

    useEffect(  () =>
    {
      const callApiGetFriends = async ()=>
      {
        const friendList = await getFriends( user._id );
        setFriends( friendList );
      }
      callApiGetFriends();
    }, [user] )
      
    const followHandleClick = async (e)=>
    {
      e.preventDefault();

      
        try
        {
          if ( !followed )
          {
            await follow( user._id, currentUser._id );
            dispatch( { type: "FOLLOW", payload: user._id } );
          }
          else
          {
            await Unfollow( user._id, currentUser._id );
            dispatch( { type: "UNFOLLOW", payload: user._id } );
          }
        }
        catch ( error )
        {
          console.log( error );
        }
      setFollowed( !followed );
    }
    return (
      <>
        {
          user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={followHandleClick}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove/> : <Add/>}
            </button>
          )
        }
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship===2 ? "Married" : ""}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends?.map( friend =>
          (
            <Link key={friend._id} to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
          
           <div key={friend._id} className="rightbarFollowing">
            <img key={friend._id}
              src={friend.profilePicture ? PublicFolder+friend.profilePicture : PublicFolder + "person/1.jpeg"}
              alt=""
              className="rightbarFollowingImg"
            />
              <span key={friend._id} className="rightbarFollowingName">{friend.username }</span>
              </div>
              </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
