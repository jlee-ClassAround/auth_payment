import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AdminRoutes } from "@/app/(admin)/_components/admin-routes";
import { AdminFooterMenu } from "@/app/(admin)/_components/admin-footer-menu";

export function AdminSidebar() {
  return (
    <Sidebar collapsible="icon" className="light bg-background z-20">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="gap-0">
        <AdminRoutes />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <AdminFooterMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
