"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { updateUserBio, updateUserTheme } from "@/lib/actions/users";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState("light");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
        // Fetch existing bio and theme from DB? 
        // For simplicity, we assume Clerk's metadata or we'd need a separate fetch.
        // Let's assume we fetch it from our DB via a server action or effect.
    }
  }, [isLoaded, user]);

  const handleSaveBio = async () => {
    setSaving(true);
    try {
      await updateUserBio(bio);
      toast.success("Bio updated successfully!");
    } catch (error) {
      toast.error("Failed to update bio.");
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = async (val: string) => {
    setTheme(val);
    try {
      await updateUserTheme(val);
      toast.success(`Theme changed to ${val}`);
    } catch (error) {
      toast.error("Failed to update theme.");
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12">
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Your Profile</h1>

        <Card>
          <CardHeader>
            <CardTitle>About You</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="h-32"
              />
            </div>
            <Button onClick={handleSaveBio} disabled={saving}>
              {saving ? "Saving..." : "Save Bio"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={handleThemeChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="theme-light" />
                <Label htmlFor="theme-light">Light</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="theme-dark" />
                <Label htmlFor="theme-dark">Dark</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="theme-custom" />
                <Label htmlFor="theme-custom">Custom Blue</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
