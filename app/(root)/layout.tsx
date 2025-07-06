import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import WelcomeProvider from "@/contexts/welcome-provider";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <WelcomeProvider>{children}</WelcomeProvider>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
