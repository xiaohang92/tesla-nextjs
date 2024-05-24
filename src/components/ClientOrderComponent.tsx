"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Order from "@/components/Order";

// Define a type for the model keys
type ModelKey = "model-s" | "model-3" | "model-x" | "model-y";

export default function ClientOrderComponent() {
  const params = useParams();
  const [model, setModel] = useState<ModelKey | null>(null);

  useEffect(() => {
    if (params?.model) {
      setModel(params.model as ModelKey);
    }
  }, [params]);

  if (!model) return null;

  return <Order model={model} />;
}
