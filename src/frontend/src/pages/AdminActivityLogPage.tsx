import React, { useState, useMemo } from 'react';
import { useGetAdminActivityLog } from '../hooks/useQueries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Ban, CheckCircle, Activity } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import type { AdminAction } from '../backend';

export default function AdminActivityLogPage() {
  const { data: activityLog, isLoading } = useGetAdminActivityLog();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLog = useMemo(() => {
    if (!activityLog) return [];
    if (filterType === 'all') return activityLog;

    return activityLog.filter((action) => {
      if (filterType === 'block') return action.action.__kind__ === 'blockUser';
      if (filterType === 'unblock') return action.action.__kind__ === 'unblockUser';
      return true;
    });
  }, [activityLog, filterType]);

  const sortedLog = useMemo(() => {
    return [...filteredLog].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  }, [filteredLog]);

  const getActionLabel = (action: AdminAction) => {
    switch (action.action.__kind__) {
      case 'blockUser':
        return {
          label: TRANSLATIONS.admin.activity.actions.block,
          userName: action.action.blockUser.userName,
          icon: <Ban className="w-3 h-3" />,
          variant: 'destructive' as const,
        };
      case 'unblockUser':
        return {
          label: TRANSLATIONS.admin.activity.actions.unblock,
          userName: action.action.unblockUser.userName,
          icon: <CheckCircle className="w-3 h-3" />,
          variant: 'outline' as const,
        };
      case 'other':
        return {
          label: action.action.other,
          userName: '',
          icon: <Activity className="w-3 h-3" />,
          variant: 'secondary' as const,
        };
      default:
        return {
          label: TRANSLATIONS.admin.activity.actions.other,
          userName: '',
          icon: <Activity className="w-3 h-3" />,
          variant: 'secondary' as const,
        };
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {TRANSLATIONS.admin.activity.title}
        </h1>
        <p className="text-muted-foreground">
          {TRANSLATIONS.admin.activity.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{TRANSLATIONS.admin.activity.filters.all}</SelectItem>
            <SelectItem value="block">{TRANSLATIONS.admin.activity.filters.block}</SelectItem>
            <SelectItem value="unblock">{TRANSLATIONS.admin.activity.filters.unblock}</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          {sortedLog.length} {TRANSLATIONS.admin.activity.actionsFound}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{TRANSLATIONS.admin.activity.table.timestamp}</TableHead>
              <TableHead>{TRANSLATIONS.admin.activity.table.action}</TableHead>
              <TableHead>{TRANSLATIONS.admin.activity.table.targetUser}</TableHead>
              <TableHead>{TRANSLATIONS.admin.activity.table.admin}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLog.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  {TRANSLATIONS.admin.activity.noActivity}
                </TableCell>
              </TableRow>
            ) : (
              sortedLog.map((action, idx) => {
                const actionInfo = getActionLabel(action);
                return (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {new Date(Number(action.timestamp) / 1000000).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(Number(action.timestamp) / 1000000).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={actionInfo.variant} className="gap-1">
                        {actionInfo.icon}
                        {actionInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {actionInfo.userName || (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {action.admin.toString().slice(0, 20)}...
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
