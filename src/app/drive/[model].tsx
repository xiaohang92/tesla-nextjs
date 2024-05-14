"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { supabase } from "@/lib/supabaseClient";
import { Toast } from "@/components/Toast";
import modelS from "/public/drive-model-s.avif";
import model3 from "/public/drive-model-3.avif";
import modelX from "/public/drive-model-x.avif";
import modelY from "/public/drive-model-y.avif";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useRouter, usePathname, useParams } from "next/navigation";

// Define a type for the model keys
type ModelKey = "model-s" | "model-3" | "model-x" | "model-y";

export default function Signup() {
  const pathname = usePathname();
  const params = useParams();
  const model = params ? params.model : null;

  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  // Add a new state for the selected model
  const [selectedModel, setSelectedModel] = useState<ModelKey>(
    model as ModelKey
  );

  const modelImages: Record<ModelKey, StaticImageData> = {
    "model-s": modelS,
    "model-3": model3,
    "model-x": modelX,
    "model-y": modelY,
  };

  // Update the `handleSelectChange` function
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ModelKey; // Type assertion
    setSelectedModel(value);
  };

  const router = useRouter();

  const handleError = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from("test_drives") // Change to your test_drives table
        .insert([
          {
            email: email, // Value from state
            tel: tel, // Value from state
            selected_model: selectedModel, // Value from state
            firstname: firstname, // Assuming you have this state
            lastname: lastname, // Assuming you have this state
          },
        ]);
      if (error) throw error;

      // Success handling
      setToastMessage("Test drive scheduled successfully!");
      setShowToast(true);
      // Remain same page to show the toast
    } catch (error: any) {
      handleError(`Error scheduling test drive: ${error.message || error}`);
    }
  };

  return (
    <div className="min-h-screen content-center max-w-2xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white ">
      <form className="my-8" onSubmit={handleSubmit}>
        {/* <div className="my-8">
          <h1 className="my-2 text-4xl font-semibold text-neutral-800 dark:text-neutral-200">
            Schedule a Test Drive
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300">
            Thank you for your interest in test driving a Tesla. We will contact
            you to review appointment availability. Drivers must be 20 years of
            age or older and hold a valid driver's license.
          </p>

          <div className="my-4 flex flex-col md:flex-col space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="model">Select a Model</Label>
              <select
                id="model"
                className="block w-full p-2 border border-gray-300 rounded-md dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                name="model"
                onChange={handleSelectChange}
                value={selectedModel}>
                <option value="model-s">Model S</option>
                <option value="model-3">Model 3</option>
                <option value="model-x">Model X</option>
                <option value="model-y">Model Y</option>
              </select>
            </LabelInputContainer>

            <div className="w-full" style={{ margin: "2rem 0" }}>
              <Image
                src={modelImages[selectedModel]}
                alt={selectedModel.replace("-", " ").toUpperCase()}
                className="w-full h-auto rounded-md"
              />
            </div>
          </div>
        </div> */}

        <CardContainer className="my-8 inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white">
              Schedule a Test Drive
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Thank you for your interest in test driving a Tesla. We will
              contact you to review appointment availability. Drivers must be 20
              years of age or older and hold a valid driver's license.
            </CardItem>
            <CardItem translateZ="70" className="w-full mt-4">
              <LabelInputContainer>
                <Label htmlFor="model">Select a Model</Label>
                <select
                  id="model"
                  className="block w-full p-2 border border-gray-300 rounded-md dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
                  name="model"
                  onChange={handleSelectChange}
                  value={selectedModel}>
                  <option value="model-s">Model S</option>
                  <option value="model-3">Model 3</option>
                  <option value="model-x">Model X</option>
                  <option value="model-y">Model Y</option>
                </select>
              </LabelInputContainer>
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={modelImages[selectedModel]}
                alt={selectedModel.replace("-", " ").toUpperCase()}
                height="1000"
                width="1000"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              />
            </CardItem>
          </CardBody>
        </CardContainer>

        <h2 className="text-xl font-medium text-neutral-800 dark:text-neutral-200">
          Contact Information
        </h2>

        <div className="my-8">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Durden"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="tel">Phone Number</Label>
              <Input
                id="tel"
                placeholder="0123456789"
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit">
            Sumbit and Continue &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </div>
      </form>
      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
