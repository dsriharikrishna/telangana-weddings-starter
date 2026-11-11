"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, LayoutDashboard, Layers, MapPin, FileText, CreditCard, ShieldCheck, LogOut, Image as ImageIcon, Star, Settings, Bell, HelpCircle, Menu, X, ChevronRight, ExternalLink, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";
import { SignOutConfirmDialog } from "@/components/ui/sign-out-dialog";

const VENDOR_NAV = [
  { label: "Overview Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
  { label: "Customer Enquiries", href: "/vendor/enquiries", icon: FileText, badge: "3 New" },
  { label: "My Services & Rates", href: "/vendor/services", icon: Layers },
  { label: "Categories Selection", href: "/vendor/categories", icon: Store },
  { label: "Service Areas (Villages)", href: "/vendor/service-areas", icon: MapPin },
  { label: "Portfolio Gallery", href: "/vendor/portfolio", icon: ImageIcon },
  { label: "Field Verification", href: "/vendor/verification", icon: ShieldCheck, status: "Verified" },
  { label: "Customer Reviews", href: "/vendor/reviews", icon: Star },
  { label: "Subscription & Plans", href: "/vendor/payments", icon: CreditCard },
  { label: "Support & Helpdesk", href: "/vendor/support", icon: HelpCircle },
  { label: "Portal Settings", href: "/vendor/settings", icon: Settings },
];

export default function VendorPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
  const currentUser = useAppStore((s) => s.currentUser);
  const logoutUser = useAppStore((s) => s.logoutUser);

  const vendorDisplayName = currentUser?.vendorDetails?.businessName || currentUser?.name || "Sri Srinivasa Kalyana Mandapam";

  const handleConfirmSignOut = () => {
    logoutUser();
    window.location.href = "/auth/login";
  };

  // If vendor is on registration page, provide a focused standalone registration workspace
  const isRegisterPage = pathname === "/vendor/register";

  if (isRegisterPage) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-body w-full">
        {/* Registration Top Bar */}
        <header className="h-16 bg-[#542034] text-white border-b border-[#762B46] px-4 sm:px-8 flex items-center justify-between shrink-0 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#762B46] text-[#C5A46D] border border-[#C5A46D]/40 flex items-center justify-center font-bold text-lg shadow-sm">
              <Store className="w-5 h-5 text-[#C5A46D]" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#C5A46D] font-bold">
                Vendor Onboarding Portal
              </div>
              <div className="text-sm sm:text-base font-bold font-heading">
                TelanganaWeddings
              </div>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-[#FAF7F2]/80 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Back to Public Marketplace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 w-full flex flex-col items-center justify-center p-4 sm:p-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row font-body w-full">
      {/* Mobile Top App Bar */}
      <header className="md:hidden bg-[#542034] text-white px-4 py-3 border-b border-white/10 flex items-center justify-between sticky top-0 z-30 shadow-sm w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#762B46] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D]">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-[#C5A46D] font-bold uppercase tracking-wider">Vendor Workspace</div>
            <div className="text-xs font-bold font-heading truncate max-w-[170px]">Sri Srinivasa Mandapam</div>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle vendor menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Vendor Portal Sidebar - Collapsible */}
      <aside
        className={cn(
          "bg-[#542034] text-white shrink-0 flex flex-col transition-all duration-300 z-20 md:min-h-screen",
          isCollapsed ? "md:w-20" : "md:w-64",
          mobileMenuOpen ? "block w-full" : "hidden md:flex"
        )}
      >
        {/* Vendor Profile Header */}
        <div className={cn(
          "p-4 border-b border-white/10 flex items-center transition-all",
          isCollapsed ? "justify-center p-3" : "gap-3"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-[#762B46] border border-[#C5A46D]/40 flex items-center justify-center text-[#C5A46D] font-bold shrink-0 shadow-sm">
              <Store className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <div className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-bold">
                  Vendor Dashboard
                </div>
                <div className="text-xs font-bold font-heading truncate text-white">
                  Sri Srinivasa Mandapam
                </div>
                <span className="inline-block mt-0.5 text-[9px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                  ✓ Field Verified
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto max-h-[calc(100vh-140px)] text-xs">
          {VENDOR_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                title={isCollapsed ? item.label : undefined}
                className={cn(
                  "flex items-center rounded-xl font-medium transition-all group",
                  isCollapsed ? "justify-center px-2 py-2.5" : "justify-between px-3 py-2.5",
                  isActive
                    ? "bg-[#762B46] text-white shadow-sm font-semibold"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-[#C5A46D]" : "text-white/60 group-hover:text-white")} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span className="text-[9px] bg-amber-500 text-stone-900 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-3 border-t border-white/10 space-y-2 shrink-0">
          <Link
            href="/"
            title={isCollapsed ? "Public Marketplace" : undefined}
            className={cn(
              "flex items-center text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors",
              isCollapsed ? "justify-center p-2" : "justify-between px-3 py-2"
            )}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              {!isCollapsed && <span>Public Marketplace</span>}
            </span>
            {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
          </Link>
          <button
            type="button"
            onClick={() => setSignOutDialogOpen(true)}
            title={isCollapsed ? "Sign Out" : undefined}
            className={cn(
              "w-full flex items-center text-xs font-semibold text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer",
              isCollapsed ? "justify-center p-2" : "gap-2 px-3 py-2"
            )}
          >
            <LogOut className="w-4 h-4" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Vendor Content Area - 100% Full Width */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        {/* Top Header Controls */}
        <header className="h-14 bg-white border-b border-[#E7DECF] px-4 sm:px-6 lg:px-8 flex items-center justify-between shrink-0 shadow-2xs w-full">
          <div className="flex items-center gap-3">
            {/* Header Sidebar Collapse/Expand Toggle */}
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex items-center justify-center p-2 rounded-xl border border-[#E7DECF] bg-[#FAF7F2] hover:bg-[#E7DECF] text-[#762B46] transition-all cursor-pointer shadow-xs active:scale-95"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-[#762B46]" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-[#762B46]" />
              )}
            </button>
            <div className="text-xs sm:text-sm text-[#57534E]">
              <span className="font-semibold text-[#292524]">Narayanpet & Mahabubnagar</span> Partner Network
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/vendor/notifications"
              className="relative p-2 rounded-lg text-[#57534E] hover:bg-[#FAF7F2] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            </Link>
            <div className="h-4 w-px bg-[#E7DECF]" />
            <Link
              href="/vendor/profile"
              className="flex items-center gap-2 text-xs font-semibold text-[#292524] hover:text-[#762B46] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-[#762B46] text-[#C5A46D] flex items-center justify-center font-bold text-xs">
                SS
              </div>
              <span className="hidden sm:inline">My Profile</span>
            </Link>
          </div>
        </header>

        {/* Vendor Page Body - Full-Width Layout */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          {children}
        </main>
      </div>

      {/* Confirmation Dialog on Sign Out */}
      <SignOutConfirmDialog
        open={signOutDialogOpen}
        onOpenChange={setSignOutDialogOpen}
        onConfirm={handleConfirmSignOut}
        userName={vendorDisplayName}
        role="vendor"
      />
    </div>
  );
}
