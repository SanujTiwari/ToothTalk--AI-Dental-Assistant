import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareIcon, ShieldIcon, CalendarIcon } from "lucide-react";

function FeatureCards() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* how to use card */}
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <MessageSquareIcon className="h-5 w-5 text-primary" />
            </div>
            How to Use
          </CardTitle>
          <CardDescription>Simple steps to get started with AI chat</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <span className="text-sm">Type your dental question in the chat box</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <span className="text-sm">Ask about dental health, treatments, or pricing</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <span className="text-sm">Get instant text responses from the AI</span>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <span className="text-sm">Continue the conversation for follow-up questions</span>
          </div>
        </CardContent>
      </Card>

      {/* features card */}
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
              <ShieldIcon className="h-5 w-5 text-primary" />
            </div>
            Features
          </CardTitle>
          <CardDescription>Advanced capabilities for dental care</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
          <div className="flex items-center p-3 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-3">
              <MessageSquareIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-sm">Instant AI Chat Responses</span>
          </div>
          <div className="flex items-center p-3 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-3">
              <ShieldIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-sm">AI-Powered Dental Guidance</span>
          </div>
          <div className="flex items-center p-3 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mr-3">
              <CalendarIcon className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-sm">Conversation History</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeatureCards;
