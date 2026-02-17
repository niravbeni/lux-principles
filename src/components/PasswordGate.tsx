"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const PASSWORD = "thefutureisnow";
const STORAGE_KEY = "lux-principles-auth";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setIsAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setIsAuthed(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (checking) {
    return null;
  }

  if (isAuthed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background px-6">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-text-secondary mb-3">
          Store of the Future
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Experience Principles
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          Enter the password to access the dashboard.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 text-sm text-foreground bg-card-surface border border-border rounded-xl placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/20 transition-all"
          />

          {error && (
            <motion.p
              className="text-xs text-red-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Incorrect password. Please try again.
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-foreground rounded-xl hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 transition-colors cursor-pointer"
            whileTap={{ scale: 0.98 }}
          >
            Enter
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
