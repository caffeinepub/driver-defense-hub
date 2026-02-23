import { useState, useEffect, useCallback } from 'react';
import type { BlockReport, WorkHistory, CeasedProfits } from '../backend';

export interface Draft {
  id: string;
  timestamp: Date;
  blockReport: Partial<BlockReport> | null;
  workHistory: Partial<WorkHistory> | null;
  ceasedProfits: CeasedProfits | null;
  legalDefense: string | null;
  step: number;
}

const DRAFTS_KEY = 'driver-defense-drafts';

export function useDraftPersistence() {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const getAllDrafts = useCallback((): Draft[] => {
    try {
      const stored = localStorage.getItem(DRAFTS_KEY);
      if (!stored) return [];
      
      const drafts = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return drafts.map((draft: any) => ({
        ...draft,
        timestamp: new Date(draft.timestamp),
      })).sort((a: Draft, b: Draft) => b.timestamp.getTime() - a.timestamp.getTime());
    } catch (error) {
      console.error('Error loading drafts:', error);
      return [];
    }
  }, []);

  const saveDraft = useCallback((draft: Draft) => {
    try {
      const drafts = getAllDrafts();
      const existingIndex = drafts.findIndex(d => d.id === draft.id);
      
      if (existingIndex >= 0) {
        drafts[existingIndex] = draft;
      } else {
        drafts.push(draft);
      }
      
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  }, [getAllDrafts]);

  const loadDraft = useCallback((id: string): Draft | null => {
    const drafts = getAllDrafts();
    return drafts.find(d => d.id === id) || null;
  }, [getAllDrafts]);

  const deleteDraft = useCallback((id: string) => {
    try {
      const drafts = getAllDrafts();
      const filtered = drafts.filter(d => d.id !== id);
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error deleting draft:', error);
      throw error;
    }
  }, [getAllDrafts]);

  const clearAllDrafts = useCallback(() => {
    try {
      localStorage.removeItem(DRAFTS_KEY);
    } catch (error) {
      console.error('Error clearing drafts:', error);
      throw error;
    }
  }, []);

  return {
    saveDraft,
    loadDraft,
    deleteDraft,
    getAllDrafts,
    clearAllDrafts,
    lastSaved,
  };
}
