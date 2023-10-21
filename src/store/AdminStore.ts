import { create } from "zustand";
import { AdminState } from "../types";

// Create the Zustand store
export const useAdminStore = create<AdminState>((set) => ({
  specialists: [],
  tanks: [],
  routes: [],
  productiveBases: [],
  states: [],
  // Add your actual actions here
  addSpecialist: (specialist) => {
    set((state) => ({
      specialists: [...state.specialists, specialist],
    }));
  },

  addTank: (tank) => {
    set((state) => ({
      tanks: [...state.tanks, tank],
    }));
  },

  addRoute: (route) => {
    set((state) => ({
      routes: [...state.routes, route],
    }));
  },

  addProductiveBase: (productiveBase) => {
    set((state) => ({
      productiveBases: [...state.productiveBases, productiveBase],
    }));
  },

  editSpecialist: (payload) => {
    set((state) => ({
      specialists: state.specialists.map((specialist) =>
        specialist.id === payload.id ? payload.data : specialist
      ),
    }));
  },

  editTank: (payload) => {
    set((state) => ({
      tanks: state.tanks.map((tank) =>
        tank.id === payload.id ? payload.data : tank
      ),
    }));
  },

  editRoute: (payload) => {
    set((state) => ({
      routes: state.routes.map((route) =>
        route.id === payload.id ? payload.data : route
      ),
    }));
  },

  editProductiveBase: (payload) => {
    set((state) => ({
      productiveBases: state.productiveBases.map((productiveBase) =>
        productiveBase.id === payload.id ? payload.data : productiveBase
      ),
    }));
  },

  removeSpecialist: (id) => {
    set((state) => ({
      specialists: state.specialists.filter(
        (specialist) => specialist.id !== id
      ),
    }));
  },

  removeTank: (id) => {
    set((state) => ({
      tanks: state.tanks.filter((tank) => tank.id !== id),
    }));
  },

  removeRoute: (id) => {
    set((state) => ({
      routes: state.routes.filter((route) => route.id !== id),
    }));
  },

  removeProductiveBase: (id) => {
    set((state) => ({
      productiveBases: state.productiveBases.filter(
        (productiveBase) => productiveBase.id !== id
      ),
    }));
  },

  setRoutes: (routes) => {
    set((state) => ({
      routes,
    }));
  },

  setSpecialists: (specialists) => {
    set((state) => ({
      specialists,
    }));
  },

  setTanks: (tanks) => {
    set((state) => ({
      tanks,
    }));
  },

  setProductiveBases: (productiveBases) => {
    set((state) => ({
      productiveBases,
    }));
  },
  setStates: (states) => set(() => ({ states })),
}));
