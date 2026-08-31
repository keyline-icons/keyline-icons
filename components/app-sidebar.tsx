"use client"

import * as React from "react"
import Link from "next/link"

import { BrandMark } from "@/components/brand-mark"
import { SET_TITLE } from "@/lib/site-chrome"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart as ChartBarIcon,
  File as FileIcon,
  FileSpreadsheet as FileChartColumnIcon,
  FileText as FileTextIcon,
  Folder as FolderIcon,
  Folders as FoldersIcon,
  Headset as HeadsetIcon,
  Home as HomeIcon,
  Record as RecordIcon,
  Route as RouteIcon,
  Search as SearchIcon,
  Settings as Settings2Icon,
  Smartphone as SmartphoneIcon,
  Users as UsersIcon,
} from "@/components/icons"
import { DemoIcon } from "@/components/demo-icon"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <DemoIcon name="home" fallback={HomeIcon} />,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: <DemoIcon name="route" fallback={RouteIcon} />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <DemoIcon name="bar-chart" fallback={ChartBarIcon} />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <DemoIcon name="folder" fallback={FolderIcon} />,
    },
    {
      title: "Team",
      url: "#",
      icon: <DemoIcon name="users" fallback={UsersIcon} />,
    },
    {
      title: "Mobile",
      url: "/demo/mobile",
      icon: <DemoIcon name="smartphone" fallback={SmartphoneIcon} />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <DemoIcon name="record" fallback={RecordIcon} />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <DemoIcon name="file-text" fallback={FileTextIcon} />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <DemoIcon name="file-text" fallback={FileTextIcon} />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <DemoIcon name="settings" fallback={Settings2Icon} />,
    },
    {
      title: "Support",
      url: "#",
      icon: <DemoIcon name="headset" fallback={HeadsetIcon} />,
    },
    {
      title: "Search",
      url: "#",
      icon: <DemoIcon name="search" fallback={SearchIcon} />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: <DemoIcon name="folders" fallback={FoldersIcon} />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <DemoIcon name="file-spreadsheet" fallback={FileChartColumnIcon} />,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: <DemoIcon name="file" fallback={FileIcon} />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              // A mockup's own brand mark. It is a real link, so it was
              // loading `/icons` in advance for anyone who scrolled the demo
              // past. See the hero pair in `app/page.tsx`.
              render={<Link href="/icons" prefetch={false} />}
            >
              <BrandMark className="size-5!" />
              <span className="text-base font-semibold">{SET_TITLE}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
