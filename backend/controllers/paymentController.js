import { catchAsynError } from "../middleware/catchAsyncError.js";


import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51LD946SIWcCx34Xs04SiEmc6tx6Hh9NFxk9LMTkuQoSF96VTO2fJ7ar8Gf0knLg55BSAQzKwzhcWOGj4lRaQSvWe00yk9LuMRn');

export const processPayment = catchAsynError(async (req, res, next) => {

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });
    res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });

  });
export const sendStripeApiKey = catchAsynError(async (req, res, next) => {

    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });

  });


