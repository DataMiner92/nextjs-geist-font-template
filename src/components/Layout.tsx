import React from "react";
import Navigation from "./Navigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t p-6 text-center text-muted-foreground">
        <p>&copy; 2024 Digital Hub Management System. Empowering communities through technology.</p>
      </footer>
    </div>
  );
};

export default Layout;
