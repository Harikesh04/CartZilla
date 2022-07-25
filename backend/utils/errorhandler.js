class ErrorHandler extends Error{//Error is the default class of the nodejs
    constructor(message,statusCode){
        super(message);//super is the constructor of error class
        this.statusCode=statusCode
        Error.captureStackTrace(this,this.constructor);
       // captureStackTrace returns a string that represents the location of that particular error in the call. It gives us a stack that helps us to find the location of that error in the code at which new Error() was Called. this will help us to find the exact error in our code.
    }
}

export default ErrorHandler