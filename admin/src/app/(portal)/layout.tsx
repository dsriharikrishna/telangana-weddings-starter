'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { useAdminStore } from '@/store/useAdminStore';
import { AdminLanguageToggle } from '@/components/AdminLanguageToggle';
import {
  LayoutDashboard, Users, Store, ShieldCheck, Grid, MapPin,
  Layers, MessageSquare, CalendarCheck, CreditCard, DollarSign, Settings, ShieldAlert, FileText,
  LogOut, PanelLeftClose, PanelLeft, Menu, X, ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();

  const isDesktopCollapsed = useAdminStore((s) => s.isSidebarCollapsed);
  const toggleSidebar = useAdminStore((s) => s.toggleSidebar);
  const adminUser = useAdminStore((s) => s.adminUser);
  const logout = useAdminStore((s) => s.logout);

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile drawer upon route navigation
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, labelEn: 'Dashboard', labelTe: 'డాష్‌బోర్డ్' },
    { href: '/vendors', icon: Store, labelEn: 'Vendors', labelTe: 'వెండర్లు' },
    { href: '/vendor-verification', icon: ShieldCheck, labelEn: 'Verification', labelTe: 'ధృవీకరణ' },
    { href: '/customers', icon: Users, labelEn: 'Customers', labelTe: 'కస్టమర్లు' },
    { href: '/categories', icon: Grid, labelEn: 'Categories', labelTe: 'వర్గాలు (18)' },
    { href: '/subcategories', icon: Layers, labelEn: 'Subcategories', labelTe: 'ఉపవర్గాలు' },
    { href: '/locations', icon: MapPin, labelEn: 'Locations', labelTe: 'గ్రామాలు & మండలాలు' },
    { href: '/enquiries', icon: MessageSquare, labelEn: 'Enquiries', labelTe: 'విచారణలు' },
    { href: '/bookings', icon: CalendarCheck, labelEn: 'Bookings', labelTe: 'బుకింగ్‌లు' },
    { href: '/payments', icon: CreditCard, labelEn: 'Payments', labelTe: 'చెల్లింపులు' },
    { href: '/commissions', icon: DollarSign, labelEn: 'Commissions', labelTe: 'కమిషన్లు & సెటిల్మెంట్లు' },
    { href: '/disputes', icon: ShieldAlert, labelEn: 'Disputes & Refunds', labelTe: 'వివాదాలు & రీఫండ్‌లు' },
    { href: '/reports', icon: FileText, labelEn: 'Reports & Analytics', labelTe: 'నివేదికలు' },
    { href: '/settings', icon: Settings, labelEn: 'System Settings', labelTe: 'సెట్టింగులు' },
  ];

  const currentNav = navItems.find(
    (i) => pathname === i.href || (i.href !== '/dashboard' && pathname.startsWith(i.href))
  );

  const collapsed = mounted ? isDesktopCollapsed : false;

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col md:flex-row relative w-full overflow-x-hidden">
      {/* =========================================
          1. MOBILE DRAWER OVERLAY & ASIDE (< md)
      ========================================= */}
      {mobileDrawerOpen && (
        <div
          onClick={() => setMobileDrawerOpen(false)}
          className="fixed inset-0 bg-black/60 z-50 md:hidden backdrop-blur-xs transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-[#542034] text-white flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out md:hidden',
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Drawer Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C5A46D] text-[#542034] font-serif font-bold text-lg flex items-center justify-center">
                శ్రీ
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-bold">
                  Platform Admin
                </div>
                <div className="text-sm font-bold font-heading">TelanganaWeddings</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Persona in Drawer */}
          {adminUser && (
            <div className="px-4 py-3 bg-black/20 border-b border-white/5 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C5A46D] text-[#542034] font-bold text-xs flex items-center justify-center shrink-0">
                {adminUser.avatarInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold truncate text-white">{adminUser.name}</div>
                <div className="text-[10px] text-stone-300 truncate">{adminUser.badgeLabel}</div>
              </div>
            </div>
          )}

          {/* Navigation Links (Mobile) */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const label = language === 'te' ? item.labelTe : item.labelEn;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors',
                    isActive
                      ? 'bg-[#C5A46D] text-[#292524] font-bold shadow-xs'
                      : 'text-stone-200 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{label}</span>
                  </div>
                  <ChevronRight className={cn('w-3.5 h-3.5 opacity-60', isActive && 'opacity-100')} />
                </Link>
              );
            })}
          </nav>

          {/* Drawer Sign Out */}
          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-rose-900/50 text-stone-200 hover:text-rose-200 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================
          2. DESKTOP SIDEBAR (Visible on md: >= 768px)
      ========================================= */}
      <aside
        className={cn(
          'hidden md:flex flex-col justify-between sticky top-0 h-screen bg-[#542034] text-white shrink-0 z-30 transition-all duration-300 ease-in-out border-r border-black/10',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        <div className="flex flex-col min-h-0 flex-1">
          {/* Brand Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-center min-h-[64px]">
            {!collapsed ? (
              <div className="min-w-0 flex-1 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#C5A46D] text-[#542034] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                  శ్రీ
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-[#C5A46D] font-bold truncate">
                    Platform Admin
                  </div>
                  <div className="text-sm font-bold font-heading truncate">TelanganaWeddings</div>
                </div>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-xl bg-[#C5A46D] text-[#542034] font-serif font-bold text-lg flex items-center justify-center mx-auto shadow-xs">
                శ్రీ
              </div>
            )}
          </div>

          {/* Persona Card in Desktop Sidebar */}
          {adminUser && (
            <div
              className={cn(
                'border-b border-white/5 bg-black/15 flex items-center transition-all',
                collapsed ? 'p-3 justify-center' : 'px-4 py-3 gap-2.5'
              )}
            >
              <div
                className="w-8 h-8 rounded-lg bg-[#C5A46D] text-[#542034] font-bold text-xs flex items-center justify-center shrink-0"
              >
                {adminUser.avatarInitials}
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold truncate text-white">{adminUser.name}</div>
                  <div className="text-[10px] text-stone-300 truncate">{adminUser.badgeLabel}</div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Items (Desktop) without tooltips */}
          <nav className="p-2 space-y-1 overflow-y-auto flex-1 text-xs font-body">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              const label = language === 'te' ? item.labelTe : item.labelEn;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={label}
                  className={cn(
                    'flex items-center rounded-xl font-medium transition-all',
                    collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2',
                    isActive
                      ? 'bg-[#C5A46D] text-[#292524] font-bold shadow-xs'
                      : 'text-stone-200 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Sign Out without tooltip */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center rounded-xl text-xs font-semibold bg-white/10 hover:bg-rose-900/50 text-stone-200 hover:text-rose-200 transition-colors cursor-pointer',
              collapsed ? 'justify-center p-3' : 'justify-center gap-2 px-3 py-2'
            )}
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* =========================================
          3. MAIN WORKSPACE CONTENT & NAVBAR
      ========================================= */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Header Navbar */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Mobile Hamburger Drawer Toggle (Mobile only) */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 -ml-1 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* The SINGLE Desktop Sidebar Toggle in the Navbar */}
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden md:flex p-2 rounded-xl border border-stone-200/80 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </button>

            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-stone-900 font-heading truncate">
                {currentNav ? (language === 'te' ? currentNav.labelTe : currentNav.labelEn) : 'Operations Portal'}
              </h1>
            </div>

            <Badge
              variant="outline"
              className="hidden lg:inline-flex text-[10px] border-emerald-300 text-emerald-800 bg-emerald-50 shrink-0"
            >
              Live Gateway
            </Badge>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Language Switcher Pill */}
            <AdminLanguageToggle />

            <div className="h-4 w-[1px] bg-stone-200 hidden sm:block" />

            {/* Admin Badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stone-600 font-medium">{adminUser?.badgeLabel || 'Staff'}</span>
            </div>
          </div>
        </header>

        {/* Content Region */}
        <main className="flex-1 p-3.5 sm:p-6 md:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
