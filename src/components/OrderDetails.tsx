// src/components/OrderDetails.tsx

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Toast } from "@/components/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface OrderDetailsProps {
  model: string;
}

export default function OrderDetails({ model }: OrderDetailsProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      showMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      showMessage(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);

  return (
    <>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="absolute top-4 right-4">
        <button
          className="w-10 h-10 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
          onClick={() => setShowInfo(!showInfo)}>
          <FontAwesomeIcon icon={faInfo} className="text-gray-600 text-base" />
        </button>

        {showInfo && (
          <div className="absolute top-12 right-0 bg-white p-4 rounded-md shadow-md w-64 z-10">
            <h2 className="text-lg font-bold mb-2">Testing Visa Card</h2>
            <p className="mb-2 cursor-pointer" onClick={handleCopyClick}>
              Card Number: 4242 4242 4242 4242
              {isCopied && <span className="text-green-500"> - Copied!</span>}
              {!isCopied && (
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
    </>
  );
}
