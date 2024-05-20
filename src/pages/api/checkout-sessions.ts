// src/pages/api/checkout-sessions.ts
import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY as string);
// const stripe = require("stripe")("sk_test_CsnggH3iChIYjrFoue5y6M98");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { priceId, model } = req.body;

      if (!priceId) {
        throw new Error("Price ID is missing.");
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/order/${model}/?success=true`,
        cancel_url: `${req.headers.origin}/order/${model}?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
