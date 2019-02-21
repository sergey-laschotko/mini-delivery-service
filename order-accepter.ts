import { genRandom } from "./lib/lib";
import { IPackage, SmallPackage, LargePackage } from "./packages";
import { IRoute } from "./routes";

interface IOrderAccepter {
    orders: IPackage[];
    getOrder: (order: IPackage) => void;
    transferOrders: () => IPackage[];
}

export class OrderAccepter implements IOrderAccepter {
    orders: IPackage[] = [];

    getOrder = (order: IPackage): void => {
        this.orders.push(order);
    }

    transferOrders = (): IPackage[] => {
        let orders = [...this.orders];
        this.orders = [];
        return orders;
    }
}

export class SimulateOrderAccepter extends OrderAccepter {
    orders: IPackage[] = [];
    routes: IRoute[];

    constructor(routes: IRoute[]) {
        super();
        this.routes = routes;
    }

    simulateDay = (ordersCount: number): void => {
        for (let i = 0; i < ordersCount; i++) {
            let fakeOrder: IPackage;
            if (genRandom(1, 2) === 1) {
                fakeOrder = new SmallPackage(this.routes);
            } else {
                fakeOrder = new LargePackage(this.routes);
            }

            this.getOrder(fakeOrder);
        }
    }
}