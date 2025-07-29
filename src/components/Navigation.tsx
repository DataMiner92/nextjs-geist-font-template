"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navigation: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleRole = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <nav className="flex items-center justify-between p-4 border-b bg-background">
      <div className="flex items-center space-x-6">
        <Link href="/" className="text-xl font-bold text-primary">
          Digital Hub Management
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-primary transition-colors">
            Projects
          </Link>
          {isAdmin && (
            <Link href="/admin" className="hover:text-primary transition-colors">
              Admin Panel
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-muted-foreground">
          {isAdmin ? "Admin Mode" : "User Mode"}
        </span>
        <Button
          onClick={toggleRole}
          variant={isAdmin ? "default" : "outline"}
          size="sm"
        >
          {isAdmin ? "Switch to User" : "Switch to Admin"}
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
