import { React, useRef,useState } from 'react'
import "./share.css"
import { Cancel } from '@material-ui/icons'
import { PermMedia,Mabel,Room,EmojiEmotions, Label } from '@material-ui/icons'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { postCall,uploadImageCall } from '../../apiCalls'

const Share = () =>
{
    const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext( AuthContext );
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async (e) =>
    {
        e.preventDefault();
        console.log( "submit handler" );
        const newPost = {
            userId: user._id,
            desc:desc.current.value
        }
       

        try
        {
            const data = new FormData();
            if (file)
            {
               
                const fileName = Date.now() + file.name;
                data.append( "name", fileName );
                data.append( "file", file );
              
                newPost.img = fileName;
                
            }
            await postCall( newPost );
            if (file)
            {
                await uploadImageCall( data );
            }
            window.location.reload();
          
        }
        catch ( err )
        {
            console.log( err );
        }

    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture ? PublicFolder+user.profilePicture : PublicFolder+"/person/noavatar.png"} alt="" />
                    <input ref={desc} placeholder={"What's in your mind " +user.username +"?"} className="shareInput" />
                </div>

                <hr className="shareHr" />
                {
                    file && (
                        <div className='shareImgContainer'>

                            <img className='shareImg' src={URL.createObjectURL(file)} alt="" />
                            <Cancel className='shareCancelImg' onClick={()=>{setFile(null)}} />
                        </div>
                    )
                }
                
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </label>
                        <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button className="shareButton" type='submit'>
                            Share
                    </button>
                </form>
            </div>
       </div>
    )
}

export default Share
