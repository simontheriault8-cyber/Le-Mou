import React, { createContext, useContext, useMemo } from 'react';
import type { ActiveDatasets } from '../utils/occupationAggregator';
import { OCCUPATION_DIRECTORY } from '../data/occupations';
import { buildFootnoteMap } from '../data/footnotes';
import { LIST_A_ENTRIES } from '../data/tables/listA';
import { LIST_B_ENTRIES } from '../data/tables/listB';
import { LIST_C_ENTRIES, LIST_D_ENTRIES, LIST_E_ENTRIES } from '../data/tables/listCDE';
import { LIST_F_ENTRIES } from '../data/tables/listF';
import { LIST_G_ENTRIES } from '../data/tables/listG';
import { LIST_H_PROFILES } from '../data/tables/listH';
import { LIST_I_ENTRIES } from '../data/tables/listI';
import { LIST_J1_ENTRIES, LIST_K_ENTRIES, LIST_L_ENTRIES } from '../data/tables/listJKL';

interface DataContextValue {
  datasets: ActiveDatasets;
}

const DataContext = createContext<DataContextValue | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const datasets: ActiveDatasets = useMemo(
    () => ({
      occupations: OCCUPATION_DIRECTORY,
      listA: LIST_A_ENTRIES,
      listB: LIST_B_ENTRIES,
      listC: LIST_C_ENTRIES,
      listD: LIST_D_ENTRIES,
      listE: LIST_E_ENTRIES,
      listF: LIST_F_ENTRIES,
      listG: LIST_G_ENTRIES,
      listH: LIST_H_PROFILES,
      listI: LIST_I_ENTRIES,
      listJ1: LIST_J1_ENTRIES,
      listK: LIST_K_ENTRIES,
      listL: LIST_L_ENTRIES,
      footnoteMap: buildFootnoteMap(),
    }),
    []
  );

  return (
    <DataContext.Provider value={{ datasets }}>
      {children}
    </DataContext.Provider>
  );
};

export function useMolData(): DataContextValue {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('useMolData must be used inside DataProvider');
  }
  return ctx;
}
