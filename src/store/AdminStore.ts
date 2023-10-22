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
        specialist.id === payload.id ? payload : specialist
      ),
    }));
  },

  editTank: (payload) => {
    console.log("Payload");
    console.log(payload);

    set((state) => ({
      tanks: state.tanks.map((tank, index) => {
        console.log(index);
        console.log(tank);
        console.log(tank.id === payload.id);

        return tank.id === payload.id ? payload : tank;
      }),
    }));
  },

  editRoute: (payload) => {
    set((state) => ({
      routes: state.routes.map((route) =>
        route.id === payload.id ? payload : route
      ),
    }));
  },

  editProductiveBase: (payload) => {
    set((state) => ({
      productiveBases: state.productiveBases.map((productiveBase) =>
        productiveBase.id === payload.id ? payload : productiveBase
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
    set(() => ({
      routes,
    }));
  },

  setSpecialists: (specialists) => {
    set(() => ({
      specialists,
    }));
  },

  setTanks: (tanks) => {
    set(() => ({
      tanks,
    }));
  },

  setProductiveBases: (productiveBases) => {
    set(() => ({
      productiveBases,
    }));
  },
  setStates: (states) => set(() => ({ states })),
}));
