const router = require( "express" ).Router();
const bcrypt = require("bcrypt");
const User = require( "../modules/User" );

//Update user
router.put( "/:id", async( req, res ) =>
{
    if (req.body.userId===req.params.id || req.user.isAdmin)
    {
        if ( req.body.password )
        {
            try
            {
                const salt = await bcrypt.genSalt( 10 );
                req.body.password = await bcrypt.hash( req.body.password, salt );
            }
            catch ( err )
            {
                return res.status( 500 ).json( err );
            }
        }
            try
            {
                const user = await User.findByIdAndUpdate( req.params.id,
                    {
                        $set:req.body
                    } );
                
                return res.status(200).json(user)
            }
            catch ( err )
            {
                return res.status(500).json("Account has been deleted")
            }
        
        
    } else
    {
        return res.status(403).json("You can only update your account !")
    }
})

//delete user
router.delete( "/:id", async( req, res ) =>
{
    if (req.body.userId===req.params.id || req.user.isAdmin)
    {
        
            try
            {
                const user = await User.findByIdAndDelete( req.params.id);
                
                return res.status(200).json("Account has been deleted !")
            }
            catch ( err )
            {
                return res.status(500).json(err)
            }
        
        
    } else
    {
        return res.status(403).json("You can only delete your  own account !")
    }
})

//get user
router.get( "/:id", async ( req, res ) =>
{
     
            try
            {
                const user = await User.findById( req.params.id);
                const { password, updatedAt,isAdmin, ...other } = user._doc;
                return res.status(200).json(other)
            }
            catch ( err )
            {
                return res.status(500).json(err)
            }
        
    
} )

//get user
router.get( "/", async ( req, res ) =>
{
    const userId = req.query.userId;
    const username = req.query.username;

    console.log("Query : username " +req.query.username );
            try
            {
                const user = userId ? await User.findById( userId ) : await User.findOne( { username: username } );

                console.log( "Query result : " + user.username );
                
                const { password, updatedAt, isAdmin, ...other } = user._doc;
                
                return res.status(200).json(other)
            }
            catch ( err )
            {
                console.log( "Query error : " + err );
                return res.status(500).json(err)
            }
        
    
} )
//get user
router.get( "/friends/:id/", async ( req, res ) =>
{
    const userId = req.params.id;
 
    console.log("Query : userId " +userId );
            try
            {
                const user = await User.findById( userId ) ;
          
                const friends = await Promise.all(
                    user.followings.map( ( friendId ) =>
                    {
                        return User.findById(  friendId  );
                    } ) );
                
                let friendList = [];
                friends.map( ( friend ) =>
                {
                    const  { _id, username, profilePicture } = friend;
            
                    friendList.push( { _id, username, profilePicture } );
                } );

                return res.status(200).json(friendList)
            }
            catch ( err )
            {
                console.log( "Query error : " + err );
                return res.status(500).json(err)
            }
        
    
} )
//follow a user
router.put( "/:id/follow", async ( req, res ) =>
{
    if ( req.body.userId !== req.params.id )
    {
        try
        {
            const user = await User.findById( req.params.id );
            const currentUser = await User.findById( req.body.userId );

            if ( !user.followers.includes( req.body.userId ) )
            {
                await user.updateOne( { $push: { followers: req.body.userId } } );
                await currentUser.updateOne( { $push: { followings: req.params.id } } );

                return res.status( 200 ).json( "user has been followed" );
            } else
            {
                res.status( 403 ).json( "you are already follow this profile" );
            }
        } catch ( err )
        {
            res.status(403).json("you can't follow yourself!")
        }
    
    
    }
} )
//unfollow a user
router.put( "/:id/unfollow", async ( req, res ) =>
{
    if ( req.body.userId !== req.params.id )
    {
        try
        {
            const user = await User.findById( req.params.id );
            const currentUser = await User.findById( req.body.userId );

            if ( user.followers.includes( req.body.userId ) )
            {
                await user.updateOne( { $pull: { followers: req.body.userId } } );
                await currentUser.updateOne( { $pull: { followings: req.params.id } } );

                return res.status( 200 ).json( "user has been unfollowed" );
            } else
            {
                res.status( 403 ).json( "you dont follow this user" );
            }
        } catch ( err )
        {
            res.status(403).json("you can't follow yourself!")
        }
    
    
    }
})
module.exports = router;