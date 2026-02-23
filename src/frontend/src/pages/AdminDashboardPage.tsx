import React from 'react';
import { useGetAdminDashboardStats } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';

export default function AdminDashboardPage() {
  const { data: stats, isLoading } = useGetAdminDashboardStats();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const totalUsers = Number(stats?.totalUsers || 0);
  const activeUsers = Number(stats?.activeUsers || 0);
  const blockedUsers = Number(stats?.blockedUsers || 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {TRANSLATIONS.admin.dashboard.title}
        </h1>
        <p className="text-muted-foreground">
          {TRANSLATIONS.admin.dashboard.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {TRANSLATIONS.admin.dashboard.stats.totalUsers}
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {TRANSLATIONS.admin.dashboard.stats.activeUsers}
            </CardTitle>
            <UserCheck className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{activeUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {TRANSLATIONS.admin.dashboard.stats.blockedUsers}
            </CardTitle>
            <UserX className="w-4 h-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{blockedUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {TRANSLATIONS.admin.dashboard.recentRegistrations}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!stats?.recentRegistrations || stats.recentRegistrations.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              {TRANSLATIONS.admin.dashboard.noRegistrations}
            </p>
          ) : (
            <div className="space-y-3">
              {stats.recentRegistrations.slice(0, 10).map((user, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(Number(user.registrationDate) / 1000000).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </p>
                    {user.isBlocked && (
                      <span className="text-xs text-destructive font-medium">
                        {TRANSLATIONS.admin.users.status.blocked}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
