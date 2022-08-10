export const catchAsynError =(thefunc) =>(req,res,next) =>{
    // here promise is the prebuilt class of js
    Promise.resolve(thefunc(req,res,next)).catch(next);
}