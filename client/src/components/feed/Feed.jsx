import React, { useState,useContext } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import "./feed.css"
import axios from "axios"
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Feed = ( { username }) =>
{
    const { user } = useContext( AuthContext );
    const [post, setPost] = useState( [] );
    useEffect( () =>
    {
        const fetchPosts = async () =>
        {
            const response = username!==undefined ?
                await axios.get( `/posts/profile/${ username }` ) : await axios.get( `/posts/timeline/${user._id}` );
            setPost( response.data.sort((p1,p2)=>{return new Date(p2.createdAt)-new Date(p1.createdAt)}) );
        }
        fetchPosts();
    },[username,user._id])
    return (
        <div className="feed">
            <div className="feedWrapper">
                {(username===user.username || username!=="") &&    <Share /> }
             
                {post?.map(
                    p => (
                        <Post key={p._id} post={p}/>
                  )
              )}  
           </div>
        </div>
    )
}

export default Feed
