import React,{useState,useEffect} from 'react'
import "./post.css"
import { MoreVert } from "@material-ui/icons"
import { Users } from '../../dummyData'
import axios from "axios"
import { format } from 'timeago.js'
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { likeCall } from '../../apiCalls';

const Post = ( { post } ) =>
{
 
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const [user, setUser] = useState( {} );
    const [like, setLike] = useState( post.likes.length );
    const [isLiked, SetIsLiked] = useState( false );
    const { user: currentUser } = useContext( AuthContext );
    useEffect( () =>
    {
        const fetchUser = async () =>
        {
            const response = await axios.get( `/users?userId=${ post.userId }` );
         
            setUser( response.data );
        }
        fetchUser();
    },[post.userId])

    useEffect( () =>
    {
        SetIsLiked( post.likes.includes( currentUser._id ) );
    }, [post.likes, currentUser._id] );

    const likeHandler = () =>
    {
        setLike( isLiked ? like - 1 : like + 1 );
        SetIsLiked( !isLiked );
        likeCall( post._id, currentUser._id );
    }

  

    return (
        <div className="post"> 
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${post.userId}`}>
                        <img className="postProfileImg" src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"person/noAvatar.png"} alt="" />
                        </Link>
                      
                        <span className="postUsername">{user?.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PublicFolder+post.img || PublicFolder+"undefined.jpg"} alt="" />
                </div>
                <div className="postBottom">
                <div className="postBottomLeft">
                        <img  className="likeIcon" src={PublicFolder+"like.png"} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={PublicFolder+"heart.png"} alt="" onClick={likeHandler} />
                        <span className="postLikeCounter">
                            {like} people like it
                        </span>
                </div>
                <div className="postBottomRight">
                        <span className="postCommentText">
                            {post.comment} comments
                        </span>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Post
