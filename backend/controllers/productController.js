import Product from "../models/productModels.js";
import ErrorHandler from "../utils/errorhandler.js";
import { catchAsynError } from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinary from "cloudinary";



//get all the product
export const getAllproducts = catchAsynError(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  //creating object for the class apifeatures && calling its methods
  const ApiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
  
  let products = await ApiFeature.query;

  let filteredProductsCount =  products.length;

  ApiFeature.pagination(resultPerPage);



  products = await ApiFeature.query.clone();
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});


//get all the product --Admin
export const getAdminProducts = catchAsynError(async (req, res,next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
    
  });
});


//creating product--Admin
export const createProduct = catchAsynError(async (req, res, next) => {

  let images = [];// empty array of images

  if (typeof req.body.images === "string") {// if single image then push in the array
    images.push(req.body.images);
  } else {
    images = req.body.images; // if multiple images then the array will the array of all the images
  }

  const imagesLinks = [];// IN THIS ARRAY WE WILL KEEP THE LINK OF ALL THE IMAGES

  for (let i = 0; i < images.length; i++) {
    // HERE WE ARE UPLOADING ALL THE IMAGES IN THE CLOUDINARY
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
    // FROM THIS WE WILL GET ALL THE LINKS OF THE IMAGES FROM CLOUDINARY IN OUR imageLinks array
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//update the product--Admin
export const updateProduct = catchAsynError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // images start here
  let images = [];// empty array of images

  if (typeof req.body.images === "string") {// if single image then push in the array
    images.push(req.body.images);
  } else {
    images = req.body.images; // if multiple images then the array will the array of all the images
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product--Admin
export const deleteProduct = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images From Cloudinary-- will prevent our unnessary storage.
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);//here we have to pass the public id of the image which we have to delete so we are passing it .
  }
  //here in this loop we are traversing through the images array in the product and we are destroying the image from the array 

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//get product details

export const getProductDetails = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//Create new Review or Update it if already added

export const createProductReview = catchAsynError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment: comment,
    // rating:req.body.rating,
    // comment:req.body.comment,
    // productId:req.body.productId
  };

  const product = await Product.findById(productId);
  
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
   
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validatorBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
export const getProductReviews = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
export const deleteReview = catchAsynError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
