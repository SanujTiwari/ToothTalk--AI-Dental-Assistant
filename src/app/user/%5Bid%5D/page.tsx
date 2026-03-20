import { getUserById } from "@/lib/actions/users";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PublicProfilePage({ params }: Props) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-24 px-6 md:px-12">
      <Navbar />
      <div className="max-w-2xl mx-auto space-y-8">
        <Card className="border-none bg-transparent shadow-none">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              {/* Note: In a real app, you'd store the image URL in the DB too. 
                  For now, we'll try to fetch it if available or use fallback. 
                  Since we only synced a few fields, we might need more fields in the DB.
              */}
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.clerkId}`} />
              <AvatarFallback>{user.firstName?.[0]}{user.lastName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground whitespace-pre-wrap">
              {user.bio || "No bio provided yet."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
