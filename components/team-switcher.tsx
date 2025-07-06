"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-black text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"></div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{"Adofly"}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
