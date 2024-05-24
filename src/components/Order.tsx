import Image, { StaticImageData } from "next/image";
import modelS from "/public/drive-model-s.avif";
import model3 from "/public/drive-model-3.avif";
import modelX from "/public/drive-model-x.avif";
import modelY from "/public/drive-model-y.avif";
import OrderDetails from "@/components/OrderDetails";

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

interface OrderProps {
  model: ModelKey;
}

export default function Order({ model }: OrderProps) {
  const modelImages: Record<ModelKey, StaticImageData> = {
    "model-s": modelS,
    "model-3": model3,
    "model-x": modelX,
    "model-y": modelY,
  };

  return (
    <div className="min-h-screen w-full content-center container py-16">
      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        {/* Image Slideshow */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-96 lg:h-96">
            <Image
              src={modelImages[model]}
              alt={model}
              sizes="(max-width: 1024px) 100vw, 50vw"
              fill
              className="object-contain rounded-md"
              priority
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
              <p className="mb-2">Wheels: 20&quot; Induction Wheels</p>
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
          </div>
          <OrderDetails model={model} />
        </div>
      </div>
    </div>
  );
}
