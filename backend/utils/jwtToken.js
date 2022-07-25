//Creating token and saving in cookie

const  sendToken  = (user,statusCode,res)=>{
    const token = user.getJWTToken();

    // options for cookie
 const options ={
     expires:new Date(
         Date.now()+process.env.COOKIE_EXPIRE *24*60*60*1000,

     ),
     httpOnly: true,
    //  HttpOnly and secure flags can be used to make the cookies more secure. When a secure flag is used, then the cookie will only be sent over HTTPS, which is HTTP over SSL/TLS.
     
 };

 res.status(statusCode).cookie("token",token,options).json({
    success: true,
    user,
    token,
  });

}

export default sendToken