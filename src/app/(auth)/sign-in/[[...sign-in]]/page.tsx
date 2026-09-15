import React from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="z-10 w-full max-w-md flex flex-col items-center space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your Enterprise Admin Core OS dashboard
          </p>
        </div>

        <div className="w-full glass-card p-2 rounded-2xl glow-border">
          <SignIn
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none w-full",
                headerTitle: "text-foreground font-display",
                headerSubtitle: "text-muted-foreground",
                formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
                formFieldLabel: "text-foreground font-medium",
                formFieldInput: "bg-muted/50 border-border text-foreground focus:ring-primary",
                footerActionLink: "text-primary hover:underline",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
