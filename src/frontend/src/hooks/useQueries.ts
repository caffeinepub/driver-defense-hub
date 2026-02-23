import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  UserProfile, 
  BlockReport, 
  WorkHistory, 
  CeasedProfits, 
  LegalDefense, 
  DashboardData 
} from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    }
  });
}

// Block Report Management
export function useAddBlockReport() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (report: BlockReport) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addBlockReport(report);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blockReports'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
}

export function useGetAllBlockReports() {
  const { actor, isFetching } = useActor();

  return useQuery<BlockReport[]>({
    queryKey: ['blockReports'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlockReports();
    },
    enabled: !!actor && !isFetching
  });
}

// Work History Management
export function useAddWorkHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (history: WorkHistory) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addWorkHistory(history);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workHistories'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
}

export function useGetAllWorkHistories() {
  const { actor, isFetching } = useActor();

  return useQuery<WorkHistory[]>({
    queryKey: ['workHistories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWorkHistories();
    },
    enabled: !!actor && !isFetching
  });
}

// Ceased Profits Calculation
export function useCalculateCeasedProfits() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      totalBlockedDays, 
      avgDailyEarnings, 
      monthlyExpenses 
    }: { 
      totalBlockedDays: bigint; 
      avgDailyEarnings: number; 
      monthlyExpenses: number;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.calculateCeasedProfits(totalBlockedDays, avgDailyEarnings, monthlyExpenses);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ceasedProfits'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
}

export function useGetAllCeasedProfits() {
  const { actor, isFetching } = useActor();

  return useQuery<CeasedProfits[]>({
    queryKey: ['ceasedProfits'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCeasedProfits();
    },
    enabled: !!actor && !isFetching
  });
}

// Legal Defense Generation
export function useGenerateLegalDefense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blockType, context }: { blockType: string; context: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateLegalDefense(blockType, context);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['legalDefenses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
}

export function useGetAllLegalDefenses() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalDefense[]>({
    queryKey: ['legalDefenses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLegalDefenses();
    },
    enabled: !!actor && !isFetching
  });
}

// Dashboard
export function useGetDashboard() {
  const { actor, isFetching } = useActor();

  return useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDashboard();
    },
    enabled: !!actor && !isFetching
  });
}
