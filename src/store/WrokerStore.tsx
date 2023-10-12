import { create } from "zustand";

export const useWorkerStore = create<WorkerState>((set) => ({
	requests: [],
	products: [],
	setProducts: (products) => set(() => ({ products })),
	setRequests: (requests) => set(() => ({ requests })),
	addRequest: (request) =>
		set((state) => ({ requests: [...state.requests, request] })),
}));
