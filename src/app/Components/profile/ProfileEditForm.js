import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { Input } from "../../Components/ui/input";
import { Label } from "../../Components/ui/label";
import { Button } from "../../Components/ui/button";
import { Textarea } from "../../Components/ui/textarea";
import { Loader2, X } from "lucide-react";

export default function ProfileEditForm({ profile, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
    instagram: profile?.socialLinks?.instagram || "",
    twitter: profile?.socialLinks?.twitter || "",
    portfolio: profile?.socialLinks?.portfolio || "",
    phoneNumber: profile?.userId?.phoneNumber || "",
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    profile?.profilePicture || "https://i.imgur.com/6VBx3io.png"
  );
  const [coverPhotoPreview, setCoverPhotoPreview] = useState(
    profile?.coverPhoto || "https://i.imgur.com/8V254hN.png"
  );
  const [isSaving, setIsSaving] = useState(false);

  // For file input accessibility
  const fileProfileInputRef = useRef();
  const fileCoverInputRef = useRef();

  const [profileFileName, setProfileFileName] = useState("");
  const [coverFileName, setCoverFileName] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Enhanced: set filename for visual feedback
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (fileType === "profile") {
        setProfilePictureFile(file);
        setProfilePicturePreview(reader.result);
        setProfileFileName(file.name);
      } else if (fileType === "cover") {
        setCoverPhotoFile(file);
        setCoverPhotoPreview(reader.result);
        setCoverFileName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (profilePictureFile) data.append("profilePicture", profilePictureFile);
    if (coverPhotoFile) data.append("coverPhoto", coverPhotoFile);
    await onSave(data);
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="relative">
        <button
          type="button"
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-10"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
        <CardHeader>
          <CardTitle>Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Profile Picture uploader */}
            <div>
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <img
                src={profilePicturePreview}
                alt="Profile preview"
                onError={(e) => {
                  e.target.src = "https://i.imgur.com/6VBx3io.png";
                }}
                className="mt-2 w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />

              {/* Custom labeled file input */}
              <div className="mt-2 flex items-center border rounded px-3 py-2 bg-white gap-2 shadow-sm max-w-xs">
                <input
                  ref={fileProfileInputRef}
                  type="file"
                  id="profile-pic-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "profile")}
                />
                <label
                  htmlFor="profile-pic-upload"
                  className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-3 py-1 rounded transition"
                >
                  Choose file
                </label>
                <span
                  className="text-sm border-l border-gray-300 pl-3 ml-2 min-w-[90px] truncate"
                  style={{
                    color: profileFileName ? "#222" : "#888",
                    fontWeight: profileFileName ? "500" : "400",
                  }}
                >
                  {profileFileName || "No file chosen"}
                </span>
              </div>
            </div>

            {/* Cover Photo uploader */}
            <div>
              <Label htmlFor="coverPhoto">Cover Photo</Label>
              <div className="mt-2 w-full aspect-video rounded-lg overflow-hidden border-2 border-gray-200 relative">
                <img
                  src={coverPhotoPreview}
                  alt="Cover preview"
                  onError={(e) => {
                    e.target.src = "https://i.imgur.com/8V254hN.png";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 flex items-center border rounded px-3 py-2 bg-white gap-2 shadow-sm max-w-xs">
                <input
                  ref={fileCoverInputRef}
                  type="file"
                  id="cover-photo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "cover")}
                />
                <label
                  htmlFor="cover-photo-upload"
                  className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-3 py-1 rounded transition"
                >
                  Choose file
                </label>
                <span
                  className="text-sm border-l border-gray-300 pl-3 ml-2 min-w-[90px] truncate"
                  style={{
                    color: coverFileName ? "#222" : "#888",
                    fontWeight: coverFileName ? "500" : "400",
                  }}
                >
                  {coverFileName || "No file chosen"}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={4}
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram Username</Label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter Username</Label>
              <Input
                id="twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
