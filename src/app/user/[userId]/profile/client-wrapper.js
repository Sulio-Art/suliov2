"use client";

import { useState } from "react";
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/Profile/profileApi";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectBackendToken } from "@/redux/auth/authSlice";

import ProfileHeader from "@/app/Components/profile/ProfileHeader";
import ProfileDetails from "@/app/Components/profile/ProfileDetails";
import ProfileEditForm from "@/app/Components/profile/ProfileEditForm";

export default function ClientWrapper() {
  const [isEditing, setIsEditing] = useState(false);

  const backendToken = useSelector(selectBackendToken);

  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useGetMyProfileQuery(undefined, {
    skip: !backendToken,
  });

  const [updateMyProfile, { isLoading: isSaving }] =
    useUpdateMyProfileMutation();

  const handleSave = async (formData) => {
    toast.promise(updateMyProfile(formData).unwrap(), {
      loading: "Saving your profile...",
      success: () => {
        setIsEditing(false);
        return "Profile updated successfully!";
      },
      error: (err) => `Failed to update: ${err.data?.message || err.message}`,
    });
  };

  if ((isLoading || isFetching) && !profile) {
    return (
      <div className="flex h-full w-full items-center justify-center p-16">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isError || (!isLoading && !profile && backendToken)) {
    return (
      <div className="text-center p-16">
        <h2 className="text-xl font-semibold text-red-600">
          Could not load your profile.
        </h2>
        <p className="text-gray-500">Please try refreshing the page.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-full w-full items-center justify-center p-16">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 bg-gray-50">
      <ProfileHeader
        profile={profile}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <div className="mt-16">
        {isEditing ? (
          <ProfileEditForm
            profile={profile}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileDetails profile={profile} />
        )}
      </div>
    </div>
  );
}