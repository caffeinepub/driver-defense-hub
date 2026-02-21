import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, TripData, FinancialBreakdown, IncidentDetails, LegalDefense, DashboardData } from '../backend';

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

export function useCalculateFinancialLoss() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripData: TripData) => {
      if (!actor) throw new Error('Actor not available');
      return actor.calculateFinancialLoss(tripData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financialLosses'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    }
  });
}

export function useGetAllFinancialLosses() {
  const { actor, isFetching } = useActor();

  return useQuery<FinancialBreakdown[]>({
    queryKey: ['financialLosses'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFinancialLosses();
    },
    enabled: !!actor && !isFetching
  });
}

export function useGenerateLegalDefense() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (incident: IncidentDetails) => {
      if (!actor) throw new Error('Actor not available');
      return actor.generateLegalDefense(incident);
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
