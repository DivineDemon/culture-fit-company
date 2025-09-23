import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Globe, MapPin, Briefcase, Upload } from "lucide-react";

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

  const [openDialog, setOpenDialog] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30 px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b pb-8">
        <Avatar className="h-28 w-28 ring-4 ring-primary/20">
          <AvatarImage src={formData.logo} alt={formData.name} />
          <AvatarFallback className="text-xl font-bold">
            {formData.name
              .split(" ")
              .map((w) => w[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <h1 className="text-3xl font-bold">{formData.name}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {formData.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-3 self-center sm:self-start">
          <Button
            variant={isEditing ? "secondary" : "default"}
            size="lg"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>

          {/* Upload Doc Button */}
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg">
                <Upload className="h-4 w-4 mr-2" /> Upload Doc
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload PDF Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Label htmlFor="document">Select PDF File</Label>
                <Input
                  id="document"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                />
                {uploadedFile && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {uploadedFile.name}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    if (uploadedFile) {
                      console.log("Uploaded PDF:", uploadedFile);
                      setOpenDialog(false);
                    }
                  }}
                >
                  Save
                </Button>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Details */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-sm">Industry</Label>
          {isEditing ? (
            <Input
              id="industry"
              value={formData.industry}
              onChange={handleChange}
            />
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
            <Input
              id="location"
              value={formData.location}
              onChange={handleChange}
            />
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
            <Input
              id="website"
              value={formData.website}
              onChange={handleChange}
            />
          ) : (
            <div className="flex items-center gap-2 font-medium">
              <Globe className="h-4 w-4 text-primary" />
              <a
                href={formData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {formData.website}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 space-y-2">
        <Label className="text-muted-foreground text-sm">Description</Label>
        {isEditing ? (
          <Input
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        ) : (
          <p className="text-muted-foreground">{formData.description}</p>
        )}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div className="mt-6">
          <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
