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
  const socials = profile?.socialLinks || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 whitespace-pre-wrap mb-3">
              {profile?.bio || "No bio provided."}
            </p>
            <div className="space-y-2">
              {profile?.location && (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile?.website && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {profile.website}
                  </a>
                </div>
              )}
              {socials.instagram && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Instagram className="h-4 w-4 text-gray-400" />
                  <a
                    href={`https://instagram.com/${socials.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{socials.instagram}
                  </a>
                </div>
              )}
              {socials.twitter && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Twitter className="h-4 w-4 text-gray-400" />
                  <a
                    href={`https://twitter.com/${socials.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @{socials.twitter}
                  </a>
                </div>
              )}
              {socials.portfolio && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <a
                    href={socials.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio
                  </a>
                </div>
              )}
            </div>
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
              <div className="flex items-center justify-between text-gray-700">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{profile.userId.phoneNumber}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}