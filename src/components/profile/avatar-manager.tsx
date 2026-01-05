
"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

const predefinedAvatars = [
  "https://picsum.photos/seed/cartoon1/200",
  "https://picsum.photos/seed/cartoon2/200",
  "https://picsum.photos/seed/cartoon3/200",
  "https://picsum.photos/seed/cartoon4/200",
  "https://picsum.photos/seed/cartoon5/200",
  "https://picsum.photos/seed/cartoon6/200",
];

type AvatarManagerProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentAvatar: string;
  onAvatarChange: (newAvatarUrl: string) => void;
};

export function AvatarManager({
  isOpen,
  onOpenChange,
  currentAvatar,
  onAvatarChange,
}: AvatarManagerProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Profile Photo</DialogTitle>
          <DialogDescription>
            Choose a new avatar or upload your own photo.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Select an Avatar
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {predefinedAvatars.map((src) => (
              <button
                key={src}
                className={cn(
                  "rounded-full ring-2 ring-transparent hover:ring-primary focus:outline-none focus:ring-primary",
                  currentAvatar === src && "ring-primary"
                )}
                onClick={() => onAvatarChange(src)}
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={src} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Or Upload Your Own
          </h3>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleUploadClick}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload from Gallery
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
