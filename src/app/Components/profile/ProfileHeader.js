import Image from "next/image";
import { Button } from "../../Components/ui/button";
import { Pencil } from "lucide-react";

export default function ProfileHeader({ profile, isEditing, setIsEditing }) {
  const fullName = profile?.userId
    ? `${profile.userId.firstName} ${profile.userId.lastName}`
    : "Artist";

  return (
    <div className="relative pb-16">
      <div className="relative h-48 md:h-64 bg-gray-200">
        <Image
          src={profile?.coverPhoto || "https://i.imgur.com/8V254hN.png"}
          alt="Cover photo"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
          priority
        />
      </div>

      <div className="absolute bottom-0 w-full flex items-end justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-end space-x-5">
          <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-full ring-4 ring-white bg-gray-200">
            <Image
              src={profile?.profilePicture || "https://i.imgur.com/6VBx3io.png"}
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <div className="pb-6">
            <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
            <p className="text-sm font-medium text-gray-500">
              @{profile?.userId?.instagramUsername || "artist"}
            </p>
          </div>
        </div>

        {!isEditing && (
          <div className="pb-6 z-10">
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
