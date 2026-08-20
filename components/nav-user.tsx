"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import {
  Bell as BellIcon,
  BracketArrowRight as LogOutIcon,
  CircleUser as CircleUserRoundIcon,
  CreditCard as CreditCardIcon,
  MoreVertical as EllipsisVerticalIcon,
} from "@/components/icons"
import { DemoIcon } from "@/components/demo-icon"

type NavUserData = {
  name: string
  email: string
}

/**
 * Initials, with no image behind them.
 *
 * The dashboard this demo is built from carries an `avatar` pointing at
 * `/avatars/shadcn.jpg`, and that file has never been in this repository. The
 * fallback caught it, so the sidebar looked right while the homepage fired two
 * 404s on every visit, which is exactly the shape of thing that survives for
 * months. The image is gone rather than added: this is a demo of the icons, and
 * a photograph of a person who is not a user of this site is not something the
 * page needs to be making a request for.
 */
function UserAvatar({
  user,
  className,
}: {
  user: NavUserData
  className?: string
}) {
  const initials = user.name.slice(0, 2).toUpperCase()
  return (
    <Avatar className={cn("size-8 rounded-lg grayscale", className)}>
      <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
    </Avatar>
  )
}

export function NavUser({ user }: { user: NavUserData }) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <UserAvatar user={user} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-foreground/70">
                {user.email}
              </span>
            </div>
            <DemoIcon
              name="more-vertical"
              fallback={EllipsisVerticalIcon}
              className="ml-auto size-4"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <UserAvatar user={user} />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <DemoIcon name="circle-user" fallback={CircleUserRoundIcon} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DemoIcon name="credit-card" fallback={CreditCardIcon} />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DemoIcon name="bell" fallback={BellIcon} />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DemoIcon name="bracket-arrow-right" fallback={LogOutIcon} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
