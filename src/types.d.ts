import { State } from "./types.d";
export interface Commom {
  name: string;
}

export type Address = {
  address: string;
};

export enum Role {
  Specialist = "specialist",
  Admin = "admin",
}

export type Month = keyof typeof Months;

export type Province = Commom & {};

export type State = {
  id: string;
  province: {
    _id: string;
    name: string;
  };
  name: string;
};

export type Route = Commom & { id: string };

export type Tank = Commom & { id: string } & Address & {
    capacity: number;
    routes: [Pick<Route, "name"> & { _id: string }];
    state: Pick<State, "name"> & { _id: string; province: string };
  };

export type ProductiveBase = Commom & { id: string } & Address & {
    route: {
      _id: string;
      name: string;
    };
    state: {
      _id: string;
      province: string;
      name: string;
    };
  };

export type MonthContract = {
  month: Month;
  cant: number;
};

export type Producer = {
  id: string;
  firstname: string;
  secondname?: string;
  surename: string;
  second_surename?: string;
  age: number;
  productive_base: string;
  ci: string;
  months_contracts: Array<MonthContract>;
  cant_animals: number;
};

export type Report = {
  id: string;
  type_milk: MilkType.hot | MilkType.cold;
  dayli_collect: Number;
  producer: {
    id: string;
    ci: string;
    firstname: string;
    surename: string;
    cant_animals: number;
  };

  createdAt: Date;
  updatedAt: Date;
};

export type User =
  | {
      id: string;
      firstname: string;
      secondname?: string;
      surename: string;
      second_surename?: string;
      username: string;
      password: string;
    } & {
      role: Role.Specialist;
      productiveBaseInCharge: {
        _id: string;
        address: string;
        name: string;
        route: string | null | undefined;
        state: string;
      };
    };

export enum Routes {
  producers = "/producer",
  tanks = "/tank",
  routes = "/route",
  productiveBases = "/productive-base",
  province = "/province",
  state = "/state",
  report = "/report",
  auth = "/auth",
}

export enum MilkType {
  hot = "hot",
  cold = "cold",
}

export enum ButtonSlider {
  next = "next",
  prev = "prev",
}

interface CommonStore {
  states: State[];
}

interface CommonActions {
  setStates: (states: IState[]) => void;
}

interface AdminState extends CommonStore, CommonActions {
  tanks: Array<Tank>;
  routes: Array<Route>;
  productiveBases: Array<ProductiveBase>;
  users: Array<User>;
  addProductiveBase: (productivebase: ProductiveBase) => void;
  addTank: (tank: Tank) => void;
  addRoute: (route: Route) => void;
  addUser: (specialist: User) => void;
  editUser: (data: User) => void;
  setUsers: (users: Array<User>) => void;
  removeUser: (id: string) => void;
  editTank: (data: Tank) => void;
  editRoute: (data: Route) => void;
  editProductiveBase: (data: ProductiveBase) => void;
  removeTank: (id: string) => void;
  removeRoute: (id: string) => void;
  removeProductiveBase: (id: string) => void;
  setRoutes: (routes: Array<Route>) => void;
  setTanks: (tanks: Array<Tank>) => void;
  setProductiveBases: (payload: Array<ProductiveBase>) => void;
}
interface SpecialistState extends CommonStore, CommonActions {
  activeProductivebase: ProductiveBase | null;
  producers: Producer[];
  reports: Report[]; // Array of reports
  setActiveProductivebase: (productiveBase: ProductiveBase) => void;
  setProducers: (producers: Producer[]) => void;
  setReports: (reports: Report[]) => void; // Set the reports array
  addProducer: (producer: Producer) => void;
  updateProducer: (data: Producer) => void;
  deleteProducer: (id: string) => void;
  addReport: (report: Report) => void; // Add a new report
  updateReport: (payload: { id: string; data: Report }) => void; // Update a report
  deleteReport: (id: string) => void; // Delete a report
}

//************************ */ Specialist Actions and State types
// CRUD Producers of his productive base
// CRUD dayli reports
// Read the info of his prodcutive base
// Generate reports of his prodcutive base --> Trabajadores cumplidores y no cumnplidores y no

interface ServerResponse {
  success: boolean;
  msg: string;
  data: any;
  error: any;
}

type TanksFormData = Pick<Tank, "id" | "address" | "capacity" | "name"> & {
  routes: Array<string>;
  state: string;
};

type ProductiveBaseFormData = Pick<
  ProductiveBase,
  "id" | "address" | "name"
> & {
  route: string;
  state: string;
};

type UserFormData = Pick<
  User,
  "id" | "firstname" | "surename" | "username" | "role"
> & {
  password: string;
  productiveBaseInCharge: string;
};

type ProducerFormData = Pick<
  Producer,
  "ci" | "id" | "firstname" | "surename" | "cant_animals"
>;
