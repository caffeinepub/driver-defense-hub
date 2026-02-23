import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Shield, Users, Activity, LayoutDashboard, ChevronDown } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

export default function AdminMenu() {
  const { data: isAdmin, isLoading } = useIsCallerAdmin();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  if (isLoading || !isAdmin) {
    return null;
  }

  const isAdminPath = currentPath.startsWith('/admin');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={isAdminPath ? "default" : "ghost"} 
          size="sm"
          className="gap-2"
        >
          <Shield className="w-4 h-4" />
          <span className="hidden lg:inline">{TRANSLATIONS.admin.menu.title}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{TRANSLATIONS.admin.menu.title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/admin/dashboard" className="flex items-center gap-2 cursor-pointer">
            <LayoutDashboard className="w-4 h-4" />
            {TRANSLATIONS.admin.menu.dashboard}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin/users" className="flex items-center gap-2 cursor-pointer">
            <Users className="w-4 h-4" />
            {TRANSLATIONS.admin.menu.users}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/admin/activity" className="flex items-center gap-2 cursor-pointer">
            <Activity className="w-4 h-4" />
            {TRANSLATIONS.admin.menu.activity}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
