

const express = require( 'express' );

const app = express();

const mongoose = require( "mongoose" );
const dotenv = require( 'dotenv' );
const helmet = require( 'helmet' );
const morgan = require( 'morgan' );

const userRouter = require( "./routes/users" )
const authRouter = require("./routes/auth")
const postRouter = require( "./routes/posts" )

const multer = require( "multer" );
const path = require( "path" );

dotenv.config();

mongoose.connect( process.env.Mongo_URL,{ useNewUrlParser: true,useUnifiedTopology: true } , () =>
{
    console.log( "Connected to MongoDB" );
} )
app.use("/images", express.static(path.join(__dirname, "public/images")));
//middleware
app.use( express.json() );
app.use( helmet() );
app.use( morgan( "common" ) );

const storage = multer.diskStorage( {
    destination: ( req, file, cb ) =>
    {
       
        cb( null, "public/images" );
    },
    filename: ( req, file, cb ) =>
    {
       cb( null, req.body.name );
    }
} );

const upload = multer( { storage: storage });
app.post( "/api/upload", upload.single( "file" ), ( req, res ) =>
{
    console.log( "POST IMAGES UPLOAD" );
    try
    {
        return res.status(200).json("File uploaded successfully.")
    }
    catch ( err )
    {
        console.log( err );
    }
})

    
app.get( "/", ( req, res ) =>
{
    res.send('Welcome to home page ! ')
} )

app.use( "/api/users", userRouter );
app.use( "/api/auth", authRouter );
app.use( "/api/posts", postRouter );

app.listen( 8800, () =>
{
    console.log("Background server is running")
})