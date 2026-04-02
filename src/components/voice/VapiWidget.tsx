"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { SendIcon, Loader2Icon, BotIcon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, isLoaded } = useUser();
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-scroll for messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "Sorry, something went wrong. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Unable to connect. Please check your internet and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col overflow-hidden pb-8">
      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-mono">
          <span>Chat with Your </span>
          <span className="text-primary uppercase">AI Dental Assistant</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Ask any dental health question and get instant expert guidance
        </p>
      </div>

      {/* CHAT AREA */}
      <Card className="bg-card/90 backdrop-blur-sm border border-border overflow-hidden flex flex-col h-[500px]">
        {/* Messages */}
        <div
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
                <Image
                  src="/logo.png"
                  alt="Tooth Talk AI"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Hi! I'm Riley 👋
              </h3>
              <p className="text-sm max-w-md">
                Your AI dental assistant. Ask me about dental health, treatments, 
                pricing, pain relief tips, or anything dental-related!
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 animate-in fade-in duration-300 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <BotIcon className="w-4 h-4 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                  <Image
                    src={user?.imageUrl!}
                    alt="You"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                <BotIcon className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your dental question..."
              className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="rounded-xl px-4 py-3 h-auto bg-primary hover:bg-primary/90 text-white"
            >
              {isLoading ? (
                <Loader2Icon className="w-5 h-5 animate-spin" />
              ) : (
                <SendIcon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ChatWidget;
