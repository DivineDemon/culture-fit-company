import { Briefcase, Globe, MapPin, Pencil } from "lucide-react";
import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const companyProfile = {
  name: "Digimark Developers",
  industry: "Software Development",
  location: "San Francisco, CA",
  website: "https://digimark.com",
  description:
    "Digimark Developers is a leading software development company specializing in innovative digital solutions for businesses worldwide.",
  logo: "/company-logo.png",
  tags: ["Innovation", "Remote Friendly", "Growth"],
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(companyProfile);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, logo: imageUrl }));
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-b from-background to-muted/30 px-6 py-10">
      <div className="flex flex-col items-center gap-6 border-b pb-8 sm:flex-row sm:items-start">
        <div className="relative">
          <Avatar className="h-28 w-28 ring-4 ring-primary/20">
            <AvatarImage src={formData.logo} alt={formData.name} />
            <AvatarFallback className="font-bold text-xl">
              {formData.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {isEditing && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute right-1 bottom-1 rounded-full bg-primary p-1 text-white shadow hover:bg-primary/90"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </>
          )}
        </div>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <h1 className="font-bold text-3xl">{formData.name}</h1>
          <p className="max-w-2xl text-muted-foreground">{formData.description}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 self-center sm:self-start">
          <Button variant={isEditing ? "outline" : "default"} size="lg" onClick={() => setIsEditing((prev) => !prev)}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm">Industry</Label>
          {isEditing ? (
            <Input id="industry" value={formData.industry} onChange={handleChange} />
          ) : (
            <div className="flex items-center gap-2 font-medium">
              <Briefcase className="h-4 w-4 text-primary" />
              {formData.industry}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm">Location</Label>
          {isEditing ? (
            <Input id="location" value={formData.location} onChange={handleChange} />
          ) : (
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              {formData.location}
            </div>
          )}
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label className="text-muted-foreground text-sm">Website</Label>
          {isEditing ? (
            <Input id="website" value={formData.website} onChange={handleChange} />
          ) : (
            <div className="flex items-center gap-2 font-medium">
              <Globe className="h-4 w-4 text-primary" />
              <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                {formData.website}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <Label className="text-muted-foreground text-sm">Description</Label>
        {isEditing ? (
          <Input id="description" value={formData.description} onChange={handleChange} />
        ) : (
          <p className="text-muted-foreground">{formData.description}</p>
        )}
      </div>

      {isEditing && (
        <div className="mt-6">
          <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
        </div>
      )}

      {/* <UploadModal
        open={openUpload}
        onClose={() => setOpenUpload(false)}
        // onUpload={handleUploadFiles}
      /> */}
    </div>
  );
};

export default Profile;
