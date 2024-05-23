// src/app/account/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/dist/server/api-utils";

interface Profile {
  email: string;
  // include other properties as needed
}

interface TestDrive {
  selected_model?: string;
  firstname?: string;
  lastname?: string;
  status?: string;
  created_at: string; // Adjust based on your column names
  // Add other necessary test drive fields
}

export default function Account() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);

  const idFromCookie = getCookie("id") as string;

  useEffect(() => {
    const fetchData = async () => {
      if (idFromCookie) {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("members")
          .select("*")
          .eq("id", idFromCookie)
          .single();

        if (profileError) {
          console.error("Error fetching profile", profileError);
          return;
        }
        setProfile(profileData);

        // Fetch test drive details
        const { data: testDriveData, error: testDriveError } = await supabase
          .from("test_drives")
          .select("*")
          .eq("member_id", profileData?.id)
          .order("created_at", { ascending: false }); // You might want to sort by creation date

        if (testDriveError) {
          console.error("Error fetching test drive", testDriveError);
          return;
        }
        setTestDrives(testDriveData);
      } else {
        console.error("Email not found in cookie");
      }
    };

    fetchData();
  }, [idFromCookie]);

  if (!profile) {
    return (
      <div className="min-h-screen max-w-2xl w-full content-center container mx-auto py-20">
        {/* Account */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Account</h1>
            <button
              onClick={() => {
                document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "/";
              }}
              className="text-sm text-gray-500 underline cursor-pointer flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
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
                Loading...
              </h3>

              <p className="mt-0.5 text-gray-700">
                Please wait while we load your profile details.
              </p>
            </div>
          </div>
        </div>
        <span className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
          <span className="relative z-10 bg-white px-6">
            Pulling Test Drive Request Details
          </span>
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen max-w-2xl w-full content-center container mx-auto py-20">
        {/* Account */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-3xl font-bold">Account</h1>
            <button
              onClick={() => {
                document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                window.location.href = "/";
              }}
              className="text-sm text-gray-500 underline cursor-pointer flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H5a3 3 0 01-3-3V7a3 3 0 013-3h5a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
          {/* Profile Section */}
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
                {/* Display email */}
                {profile.email}
              </h3>

              <p className="mt-0.5 text-gray-700">
                {/* Display welcome message */}
                Welcome to Tesla! Here you can view your test drive requests.
                Appreciate your interest in our products.
              </p>
            </div>
          </div>
        </div>
        <span className="relative flex justify-center">
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
          <span className="relative z-10 bg-white px-6">
            Test Drive Request Details
          </span>
        </span>
        {/* Divider and Test Drive Section */}
        {testDrives.length > 0 ? (
          testDrives.map((drive, index) => (
            <div key={index} className="my-4">
              <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
                <dl className="-my-3 divide-y divide-gray-100 text-sm">
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Model</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {drive.selected_model}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Status</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {drive.status}
                    </dd>
                  </div>
                  <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-gray-900">Request at</dt>
                    <dd className="text-gray-700 sm:col-span-2">
                      {new Date(drive.created_at).toLocaleString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))
        ) : (
          <span className="relative flex justify-center">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>
            <span className="relative z-10 bg-white px-6">
              No Test Drive Requests Found
            </span>
          </span>
        )}
      </div>
    </>
  );
}
