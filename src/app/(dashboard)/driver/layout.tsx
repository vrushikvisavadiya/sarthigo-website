import { DriverSidebar } from "@/components/dashboard/driver-sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-muted/30">
      <DriverSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <DashboardTopbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
