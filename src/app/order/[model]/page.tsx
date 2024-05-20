// src/app/order/%5Bmodel%5D/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import modelS from "/public/drive-model-s.avif";
import model3 from "/public/drive-model-3.avif";
import modelX from "/public/drive-model-x.avif";
import modelY from "/public/drive-model-y.avif";
import { loadStripe } from "@stripe/stripe-js";
import { Toast } from "@/components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface Order {
  selected_model?: string;
}

// Define a type for the model keys
type ModelKey = "model-s" | "model-3" | "model-x" | "model-y";

// Define price(html) for each model
const priceAmounts: Record<ModelKey, number> = {
  "model-s": 66490,
  "model-3": 33990,
  "model-x": 63990,
  "model-y": 31490,
};

// Define price IDs for each model
const priceIds: Record<ModelKey, string> = {
  "model-s": "price_1PIWw512X2VrLBUabLUxa4T7",
  "model-3": "price_1PIWy712X2VrLBUa64kBOJ1M",
  "model-x": "price_1PIX1P12X2VrLBUa2R25aMFA",
  "model-y": "price_1PIWrY12X2VrLBUaQ20RUsRn",
};

export default function Order() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Get the model from the URL
  const params = useParams();
  const model = params?.model as ModelKey;

  const modelImages: Record<ModelKey, StaticImageData> = {
    "model-s": modelS,
    "model-3": model3,
    "model-x": modelX,
    "model-y": modelY,
  };

  const showMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCopyClick = async () => {
    try {
      await copy("4242 4242 4242 4242");
      setIsCopied(true);
      showMessage("Copied to clipboard");
    } catch (error) {
      showMessage("Failed to copy");
    }
  };
  // Get the result from the URL
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      showMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      showMessage(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
    // Remove the query parameters from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen w-full content-center container">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        {/* Image Slideshow */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-96 lg:h-96">
            <Image
              src={modelImages[model]}
              alt={model}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>

        {/* Order Details */}
        <div className="w-full lg:w-1/2 h-96 mt-4 lg:mt-0 lg:ml-4 bg-white p-4 rounded-md shadow-md relative">
          <div className="flex flex-col justify-start items-start">
            <form action="/api/checkout-sessions" method="POST">
              <input type="hidden" name="priceId" value={priceIds[model]} />
              <input type="hidden" name="model" value={model} />
              <h1 className="text-2xl font-bold mb-4">Order Details</h1>
              <p className="mb-2">Model: {model}</p>
              <p className="mb-2">Price: ${priceAmounts[model]}</p>
              <p className="mb-2">Color: Black</p>
              <p className="mb-2">Wheels: 20" Induction Wheels</p>
              <p className="mb-2">Interior: Black and White</p>
              <p className="mb-2">Self Driving: Yes</p>
              <p className="mb-2">Estimated Delivery: 2-4 weeks</p>
              <button
                type="submit"
                role="link"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Checkout with Stripe
              </button>
            </form>
            <Toast
              message={toastMessage}
              show={showToast}
              onClose={() => setShowToast(false)}
            />
          </div>
          {/* Info Icon (popover when clicked) */}
          <div className="absolute top-4 right-4">
            <button
              className="w-10 h-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
              onClick={() => setShowInfo(!showInfo)}>
              <FontAwesomeIcon icon={faInfo} className="text-gray-600" />
            </button>

            {showInfo && (
              <div className="absolute top-12 right-0 bg-white p-4 rounded-md shadow-md w-64 z-10">
                <h2 className="text-lg font-bold mb-2">Testing Visa Card</h2>
                <p className="mb-2 cursor-pointer" onClick={handleCopyClick}>
                  Card Number: 4242 4242 4242 4242
                  {isCopied && (
                    <span className="text-green-500"> - Copied!</span>
                  )}
                  {/* Click to copy info message */}
                  {isCopied == false && (
                    <span className="text-orange-500"> - Click to copy</span>
                  )}
                </p>
                <p className="mb-2">Expiration Date: Any future date</p>
                <p className="mb-2">CVC: Any 3 digits</p>
                <button
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  onClick={() => setShowInfo(false)}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
