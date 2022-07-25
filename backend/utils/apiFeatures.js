import Product from "../models/productModels.js";

class ApiFeatures {
  // in query we are getting Product.find() and in queryStr we find keyword like mobile (jis keyword ko apn dhund
  //   rhe hai)
  constructor(query, queryStr) {
    //**constructor Method - these methods are automatically called when class is called by object
    // the main use of constructor is to define the properties or assign the value to some objects in the class  
    
   // ///
    this.query = query;
    this.queryStr = queryStr;
  }
  //creating search method
  search() {
    // here we can acces query and queryStr anywhere in this class by using ** this.query && ** this.queryStr  
    const keyword = this.queryStr.keyword
      ? {//agar mila h to
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",//this will enable search whether lower  case or upper case
          },
        }//agar nii mila toh                                  
      : {};

    this.query = this.query.find({ ...keyword });//using spread operator
    return this;
  }
//creating filter method
  filter() {
    const queryStrCopy = { ...this.queryStr };//using spread operator to make copy of the copy string .

    //Removing some fields for category

    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryStrCopy[key]);
 
    //Filter for price and rating
    let queryStr = JSON.stringify(queryStrCopy); //converting it to string
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr)); //converting it back to object
    return this;

    //searching the desired category
  }
// creating pagination method for limiting the number of results in the page
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; //agar toh user page no. deta h substr m toh thik nii toh dafault me1 le k chalo
    const skip = resultPerPage * (currentPage - 1);

    this.query=this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
