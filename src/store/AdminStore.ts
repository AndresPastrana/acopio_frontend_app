import { create } from "zustand";
import { AdminState } from "../types";

// Create the Zustand store
export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  tanks: [],
  routes: [],
  productiveBases: [],
  states: [],

  addUser: (user) => {
    set((state) => ({
      users: [...state.users, user],
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

  editUser: (user) => {
    set((state) => ({
      users: state.users.map((u) => (u.id === user.id ? user : u)),
    }));
  },

  editTank: (payload) => {
    set((state) => ({
      tanks: state.tanks.map((tank, index) => {
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
  removeUser: (id) => {
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
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

  setUsers: (users) => {
    set(() => ({
      users,
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
