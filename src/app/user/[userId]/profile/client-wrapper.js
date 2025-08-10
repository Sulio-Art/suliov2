"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, AlertTriangle } from "lucide-react";
import ProfileHeader from "../../../Components/profile/ProfileHeader";
import ProfileDetails from "../../../Components/profile/ProfileDetails";
import ProfileEditForm from "../../../Components/profile/ProfileEditForm";
import toast from "react-hot-toast";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientWrapper() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.backendToken) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${BACKEND_API_URL}/profiles/me`, {
            headers: { Authorization: `Bearer ${session.backendToken}` },
          });
          if (!response.ok) throw new Error("Failed to fetch profile.");
          const data = await response.json();
          setProfile(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else if (status === "unauthenticated") {
        setLoading(false);
    }
  }, [session, status]);

  const handleSave = async (formData) => {
    try {
        const response = await fetch(`${BACKEND_API_URL}/profiles/me`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${session.backendToken}` },
            body: formData,
        });
        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || "Failed to update profile.");
        }
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        toast.success("Profile updated successfully!");
        setIsEditing(false);
    } catch (err) {
        toast.error(err.message);
    }
  };

  if (loading) {
    return <div className="flex-1 p-8 flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-blue-600" /></div>;
  }

  if (error) {
    return <div className="flex-1 p-8 flex flex-col items-center justify-center text-red-500"><AlertTriangle className="h-10 w-10 mb-2"/><span>{error}</span></div>;
  }
  
  if (!session) {
      return <div className="flex-1 p-8 text-center">Please log in to view your profile.</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <ProfileHeader 
            profile={profile} 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
        />
        <div className="transform -translate-y-12">
            <main className="p-4 md:p-8">
                {isEditing ? (
                    <ProfileEditForm 
                        profile={profile} 
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <ProfileDetails profile={profile} />
                )}
            </main>
        </div>
      </div>
    </div>
  );
}