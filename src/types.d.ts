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

export type State = Commom & {
	province: string;
};

export type Route = Commom & { id: string };

export type Tank = Commom & { id: string } & Address & {
		capacity: number;
		state: string;
		routes: [string];
	};

export type ProductiveBase = Commom & { id: string } & Address & {
		state: string;
		route: string;
	};

export type MonthContract = {
	month: Month;
	cant: number;
};

export type Producer = {
	firstname: string;
	secondname?: string;
	surename: string;
	second_surename?: string;
	age: number;
	phone_number: string;
	productive_base: string;
	ci: string;
	months_contracts?: Array<MonthContract>;
	cant_animals?: number;
};

export type Report = {
	type_milk: MilkType.hot | MilkType.cold;
	dayli_collect: Number;
	producer: string;
	productive_base: string;
};

export type User =
	| {
			firstname: string;
			secondname?: string;
			surename: string;
			second_surename?: string;
			username: string;
			password: string;
	  } & { id: string } & (
				| {
						role: Role.Specialist;
						productiveBaseInCharge: string;
				  }
				| {
						role: Role.Admin;
				  }
			);

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
//************************ */ Admin Actions and State types
// 1- CRUD of specialist
// 2- CRUD of productive bases
// 3- CRUD of Tanks
// 4- CRUD of routes
interface AdminState {
	specialists: Array<User>;
	tanks: Array<Tank>;
	routes: Array<Route>;
	productiveBases: Array<ProductiveBase>;
	addProductiveBase: (productivebase: ProductiveBase) => void;
	addSpecialist: (specialist: User) => void;
	addTank: (tank: Tank) => void;
	addRoute: (route: Route) => void;
	editSpecialist: (payload: { id: string; data: User }) => void;
	editTank: (payload: { id: string; data: Tank }) => void;
	editRoute: (payload: { id: string; data: Route }) => void;
	editProductiveBase: (payload: { id: string; data: ProductiveBase }) => void;
	removeSpecialist: (id: string) => void;
	removeTank: (id: string) => void;
	removeRoute: (id: string) => void;
	removeProductiveBase: (id: string) => void;
	setRoutes: (payload: Array<Route>) => void;
	setSpecialists: (payload: Array<User>) => void;
	setTanks: (payload: Array<Tank>) => void;
	setProductiveBases: (payload: Array<ProductiveBase>) => void;
}

//************************ */ Specialist Actions and State types
// CRUD Producers of his productive base
// CRUD dayli reports
// Read the info of his prodcutive base
// Generate reports of his prodcutive base --> Trabajadores cumplidores y no cumnplidores y no
