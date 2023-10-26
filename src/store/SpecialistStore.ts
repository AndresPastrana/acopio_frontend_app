import { create } from "zustand";
import { SpecialistState } from "../../src/types";
export const useSpecialistStore = create<SpecialistState>((set) => ({
  states: [],
  setStates: (states) => set({ states }),
  activeProductivebase: null,
  producers: [],
  reports: [],
  setActiveProductivebase: (productiveBase) =>
    set({ activeProductivebase: productiveBase }),
  setProducers: (producers) => set({ producers }),
  setReports: (reports) => set({ reports }),
  addProducer: (producer) =>
    set((state) => ({ producers: [...state.producers, producer] })),
  updateProducer: (data) =>
    set((state) => ({
      producers: state.producers.map((producer) =>
        producer.id === data.id ? data : producer
      ),
    })),
  deleteProducer: (id) =>
    set((state) => ({
      producers: state.producers.filter((producer) => producer.id !== id),
    })),
  addReport: (report) =>
    set((state) => ({ reports: [...state.reports, report] })),
  updateReport: ({ id, data }) =>
    set((state) => ({
      reports: state.reports.map((report) =>
        report.id === id ? data : report
      ),
    })),
  deleteReport: (id) =>
    set((state) => ({
      reports: state.reports.filter((report) => report.id !== id),
    })),
}));
