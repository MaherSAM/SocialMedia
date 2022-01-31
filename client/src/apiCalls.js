import axios from "axios";

export const loginCall = async ( userCredentials, dispatch ) =>
{
    dispatch( { type: "LOGIN_START" } );
    try
    {
        const res = await axios.post( "auth/login", userCredentials );
        dispatch( { type: "LOGIN_SUCCESS", payload: res.data } );
    }
    catch ( err )
    {
        dispatch( { type: "LOGIN_FAILURE", payload: err } );
    }
}
export const registerCall = async ( userCredentials ) =>
{
   
    try
    {    
         await axios.post( "auth/register", userCredentials );
        
    }
    catch ( err )
    {
        console.log( err );
    }
}
export const likeCall = async (postId,userId) =>
{
    console.log( "Like call" );
    try
    {
        await axios.put( "/posts/" + postId + "/like", { userId: userId } );
    }
    catch ( err )
    {
        console.log( err );
    }
}
export const postCall = async ( post ) =>
{
    console.log( "Post call" );
    try
    {
        await axios.post( "/posts/" ,post);
    }
    catch ( err )
    {
        console.log( err );
    }
}
export const uploadImageCall = async ( data )=>
{
    console.log( "Upload image call" );
    try
    {
        await axios.post( "/upload/" ,data);
    }
    catch ( err )
    {
        console.log( err );
    }
}
export const getFriends = async ( userId ) =>
{
    console.log( "GetFriends" );
    try
    {
       var response =  await axios.get( "/users/friends/" + userId )
        return response.data;
    }
    catch ( err )
    {
        console.log( err );
    }
}
export const follow=async( userId,userIdToFollow )=>
{
    console.log( "Follow" );
    try
    {
        var response = await axios.put( "/users/"+userId+"/follow",{userId:userIdToFollow} );
        return response.data;
    }
    catch ( error )
    {
        console.log( error );
    }

}
export const Unfollow=async( userId,userIdToUnfollow )=>
{
    console.log( "Unfollow" );
    try
    {
        var response = await axios.put( "/users/"+userId+"/unfollow",{userId:userIdToUnfollow} );
        return response.data;
    }
    catch ( error )
    {
        console.log( error );
    }

}