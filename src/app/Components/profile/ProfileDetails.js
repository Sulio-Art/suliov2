import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";

import {
  Globe,
  MapPin,
  Instagram,
  Twitter,
  Briefcase,
  Mail,
  Phone,
} from "lucide-react";

export default function ProfileDetails({ profile }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-wrap">
              {profile?.bio || "No bio provided."}
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {profile?.userId?.email && (
              <a
                href={`mailto:${profile.userId.email}`}
                className="flex items-center gap-3 text-blue-600 hover:underline"
              >
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{profile.userId.email}</span>
              </a>
            )}

           
            {profile?.userId?.phoneNumber && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{profile.userId.phoneNumber}</span>
              </div>
            )}

           
            {profile?.location && (
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile?.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline"
              >
                <Globe className="h-5 w-5 text-gray-400" />
                <span>{profile.website}</span>
              </a>
            )}
            {profile?.socialLinks?.instagram && (
              <a
                href={`https://instagram.com/${profile.socialLinks.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline"
              >
                <Instagram className="h-5 w-5 text-gray-400" />
                <span>{profile.socialLinks.instagram}</span>
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a
                href={`https://twitter.com/${profile.socialLinks.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline"
              >
                <Twitter className="h-5 w-5 text-gray-400" />
                <span>{profile.socialLinks.twitter}</span>
              </a>
            )}
            {profile?.socialLinks?.portfolio && (
              <a
                href={profile.socialLinks.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-blue-600 hover:underline"
              >
                <Briefcase className="h-5 w-5 text-gray-400" />
                <span>Portfolio</span>
              </a>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
