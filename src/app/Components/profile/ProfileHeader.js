import Image from "next/image";
import { Button } from "../../Components/ui/button";
import { Pencil } from "lucide-react";

export default function ProfileHeader({ profile, isEditing, setIsEditing }) {
  const fullName = profile?.userId
    ? `${profile.userId.firstName ?? ""} ${profile.userId.lastName ?? ""}`.trim() ||
      "Artist"
    : "Artist";
  const coverPhoto = profile?.coverPhoto?.trim() || null;
  const profilePicture = profile?.profilePicture?.trim() || null;

  // Add bottom margin to accommodate the overlapping profile picture
  return (
    <div className="relative mb-6">
      {/* Cover Photo Container */}
      <div className="relative h-48 md:h-64 bg-gray-100 rounded-b-lg overflow-hidden">
        {coverPhoto && (
          <>
            <Image
              src={coverPhoto}
              alt="Cover Photo"
              fill
              style={{ objectFit: "fill", objectPosition: "center top" }}
              className="rounded-b-lg"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </>
        )}
      </div>

      {/* Profile Info - positioned to overlap cover photo */}
      <div className="absolute bottom-0 left-6 md:left-8 transform translate-y-1/4">
        <div className="flex items-end space-x-4 md:space-x-6">
          {/* Profile Picture - overlapping the cover photo */}
          <div className="relative h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 rounded-full ring-4 ring-white bg-gray-200 overflow-hidden shadow-lg flex-shrink-0">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt="Profile picture"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-3xl font-bold">
                  {fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Name positioned next to profile picture */}
          <div className="pb-6" style={{ marginBottom: "5px" }}>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
              style={{
                textShadow:
                  "0 2px 8px rgba(0,0,0,0.6), 0 1px 2px rgba(0,0,0,0.4)",
              }}
            >
              {fullName}
            </h1>
          </div>
        </div>
      </div>

      {/* Edit Button - positioned separately */}
      {!isEditing && (
        <div className="absolute top-4 right-6 md:right-8 z-10">
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="bg-white/90 hover:bg-white border-white/20 text-gray-900 shadow-lg"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
}
