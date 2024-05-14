// src/app/account/page.tsx
import React from "react";
import Image from "next/image";

export default function Account() {
  return (
    <>
      <div className="min-h-screen max-w-2xl w-full content-center container mx-auto py-20">
        {/* Account */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Account</h1>
          <div className="flex items-start gap-4">
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Picture"
              width={80}
              height={80}
              className="rounded-full"
            />

            <div>
              <h3 className="text-lg/tight font-medium text-gray-900">
                John Doe
              </h3>

              <p className="mt-0.5 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptates voluptas distinctio nesciunt quas non animi.
              </p>
            </div>
          </div>
        </div>
        {/* Divider */}
        <span className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

          <span className="relative z-10 bg-white px-6">
            Lorem, ipsum dolor
          </span>
        </span>

        {/* Details */}
        <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Title</dt>
              <dd className="text-gray-700 sm:col-span-2">Mr</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name</dt>
              <dd className="text-gray-700 sm:col-span-2">John Frusciante</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Occupation</dt>
              <dd className="text-gray-700 sm:col-span-2">Guitarist</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Salary</dt>
              <dd className="text-gray-700 sm:col-span-2">$1,000,000+</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Bio</dt>
              <dd className="text-gray-700 sm:col-span-2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et
                facilis debitis explicabo doloremque impedit nesciunt dolorem
                facere, dolor quasi veritatis quia fugit aperiam aspernatur
                neque molestiae labore aliquam soluta architecto?
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
