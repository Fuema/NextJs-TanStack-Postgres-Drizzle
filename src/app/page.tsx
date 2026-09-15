import React from "react";
import { ShieldCheck, Database, Layers, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24 relative overflow-hidden bg-background text-foreground">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="z-10 max-w-4xl w-full flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-semibold text-primary border border-primary/30 glow-border">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span>Phase 1 Verified — Core OS Foundation Online</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
          Next.js 15+ Enterprise Admin OS
        </h1>

        <p className="text-muted-foreground text-lg max-w-2xl">
          High-performance administrative dashboard architecture built with React 19, Drizzle ORM, Zod validation, and edge security guards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-6">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-start space-y-3 text-left hover:border-primary/40 transition-colors">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg font-display">Type-Safe Guards</h3>
            <p className="text-sm text-muted-foreground">
              Centralized Zod environment parsing and strict TypeScript compilation enabled.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-start space-y-3 text-left hover:border-primary/40 transition-colors">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg font-display">Relational Data Engine</h3>
            <p className="text-sm text-muted-foreground">
              Drizzle ORM schema tracking Users, Posts, and Audit Logs with relational cascading rules.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-start space-y-3 text-left hover:border-primary/40 transition-colors">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg font-display">Glassmorphism HSL</h3>
            <p className="text-sm text-muted-foreground">
              Dynamic CSS variable design system featuring dark mode contrast tokens and micro-interactions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
