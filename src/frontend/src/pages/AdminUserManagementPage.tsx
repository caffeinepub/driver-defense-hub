import React, { useState, useMemo } from 'react';
import { useGetAllUsers } from '../hooks/useQueries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Search, Ban, CheckCircle } from 'lucide-react';
import { TRANSLATIONS } from '../constants/translations';
import BlockUserDialog from '../components/BlockUserDialog';
import UnblockUserDialog from '../components/UnblockUserDialog';
import type { UserProfileWithPrincipal } from '../backend';

export default function AdminUserManagementPage() {
  const { data: users, isLoading } = useGetAllUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [unblockDialogOpen, setUnblockDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{ principal: any; name: string } | null>(null);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchTerm) return users;

    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.profile.name.toLowerCase().includes(term) ||
        user.profile.email.toLowerCase().includes(term) ||
        user.principal.toString().toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const handleBlockClick = (user: UserProfileWithPrincipal) => {
    setSelectedUser({ principal: user.principal, name: user.profile.name });
    setBlockDialogOpen(true);
  };

  const handleUnblockClick = (user: UserProfileWithPrincipal) => {
    setSelectedUser({ principal: user.principal, name: user.profile.name });
    setUnblockDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <Skeleton className="h-10 w-full max-w-md" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {TRANSLATIONS.admin.users.title}
        </h1>
        <p className="text-muted-foreground">
          {TRANSLATIONS.admin.users.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={TRANSLATIONS.admin.users.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredUsers.length} {TRANSLATIONS.admin.users.usersFound}
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{TRANSLATIONS.admin.users.table.name}</TableHead>
              <TableHead>{TRANSLATIONS.admin.users.table.email}</TableHead>
              <TableHead>{TRANSLATIONS.admin.users.table.registrationDate}</TableHead>
              <TableHead>{TRANSLATIONS.admin.users.table.status}</TableHead>
              <TableHead className="text-right">{TRANSLATIONS.admin.users.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  {TRANSLATIONS.admin.users.noUsers}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow
                  key={user.principal.toString()}
                  className={user.profile.isBlocked ? 'bg-destructive/5' : ''}
                >
                  <TableCell className="font-medium">{user.profile.name}</TableCell>
                  <TableCell>{user.profile.email}</TableCell>
                  <TableCell>
                    {new Date(Number(user.profile.registrationDate) / 1000000).toLocaleDateString(
                      'pt-BR',
                      {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      }
                    )}
                  </TableCell>
                  <TableCell>
                    {user.profile.isBlocked ? (
                      <Badge variant="destructive" className="gap-1">
                        <Ban className="w-3 h-3" />
                        {TRANSLATIONS.admin.users.status.blocked}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="gap-1 text-green-600 border-green-600">
                        <CheckCircle className="w-3 h-3" />
                        {TRANSLATIONS.admin.users.status.active}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {user.profile.isBlocked ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUnblockClick(user)}
                      >
                        {TRANSLATIONS.admin.users.actions.unblock}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleBlockClick(user)}
                      >
                        {TRANSLATIONS.admin.users.actions.block}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BlockUserDialog
        open={blockDialogOpen}
        onOpenChange={setBlockDialogOpen}
        user={selectedUser}
      />
      <UnblockUserDialog
        open={unblockDialogOpen}
        onOpenChange={setUnblockDialogOpen}
        user={selectedUser}
      />
    </div>
  );
}
