import Order from "../models/OrderModel.js";
import Product from "../models/productModels.js";
import ErrorHandler from "../utils/errorhandler.js";
import { catchAsynError } from "../middleware/catchAsyncError.js";
import ApiFeatures from "../utils/apiFeatures.js";

//Create new order
export const newOrder = catchAsynError(async (req, res, next) => {
  const {
    // taking these data by destructuring here.
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order

export const getSingleOrder = catchAsynError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name  email"
  );
  // here with the help of populate function with the help of id we will print name and email of the user
  if (!order) {
    return next(new ErrorHandler("order is not placed with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});
//get logged in user's order

export const myOrders = catchAsynError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }); //here we are searching all the orders of the logged in user with the help of his id.

  res.status(200).json({
    success: true,
    orders,
  });
});
//get all orders -- Admin

export const GetAllOrders = catchAsynError(async (req, res, next) => {
  const orders = await Order.find(); //here we are searching all the orders .

  //calculating cost of all the orders

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
//Update Order Status -- Admin

export const updateOrder = catchAsynError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);//updating the stock of orders
    });
  }
  order.orderStatus = req.body.status;//jo status apn bhejenge frontend se

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//creating the function updateStock to update our stock of remaining product we have .
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//delete orders -- Admin

export const deleteOrder = catchAsynError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
