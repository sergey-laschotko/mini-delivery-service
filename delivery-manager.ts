import { IPackage } from "./packages";
import { IRoute } from "./routes";
import { ITransport, Car, Truck } from "./transport";

interface IReport {
    totalOrders: number;
    totalKG: number;
    totalSPackages: number;
    totalLPackages: number;
    totalSPackagesKG: number;
    totalLPackagesKG: number;
    packagesByRoutes: {[key: string]: any};
};

interface IDeliveryManager {
    takeOrders(packages: IPackage[]): void;
    getReport(): IReport;
    setToAutos(): object;
    sendAutos(): void;
    signRestPackages(): void;
}

export class DeliveryManager implements IDeliveryManager {
    orders: IPackage[] = [];
    loadedOrders: string[] = [];
    routes: IRoute[];

    constructor(routes: IRoute[]) {
        this.routes = routes;
    }

    takeOrders = (packages: IPackage[]) => {
        this.orders = packages;
    }

    getReport = () => {
        const report: IReport = {
            totalOrders: 0,
            totalKG: 0,
            totalSPackages: 0,
            totalLPackages: 0,
            totalSPackagesKG: 0,
            totalLPackagesKG: 0,
            packagesByRoutes: {}
        };

        for (let i = 0; i < this.routes.length; i++) {
            report.packagesByRoutes[this.routes[i].slug] = {
                totalPackages: 0,
                smallPackages: 0,
                largePackages: 0,
                totalKG: 0,
                smallPackagesKG: 0,
                largePackagesKG: 0,
                route: this.routes[i]
            };
        }

        for (let i = 0; i < this.orders.length; i++) {
            let pack = this.orders[i];
            let weight: number = pack.weight;
            let isSmall: boolean = pack.weight === 2 ? true : false;
            let route: string = this.routes[pack.route].slug;

            report.totalOrders += 1;
            report.totalKG += weight;
            report.totalSPackages += isSmall ? 1 : 0;
            report.totalLPackages += isSmall ? 0 : 1;
            report.totalSPackagesKG += isSmall ? weight : 0;
            report.totalLPackagesKG += isSmall ? 0 : weight;
            report.packagesByRoutes[route].totalPackages += 1;
            report.packagesByRoutes[route].smallPackages += isSmall ? 1 : 0;
            report.packagesByRoutes[route].largePackages += isSmall ? 0 : 1;
            report.packagesByRoutes[route].totalKG += weight;
            report.packagesByRoutes[route].smallPackagesKG += isSmall ? weight : 0;
            report.packagesByRoutes[route].largePackagesKG += isSmall ? 0 : weight;
        }

        return report;
    }
    
    setToAutos = () => {
        const setting: {[key: string]: any} = {};
        const total = this.getReport();
        const ordersCopy = [...this.orders];

        for (let i = 0; i < this.routes.length; i++) {
            setting[this.routes[i].slug] = {
                trucks: [],
                cars: [],
                route: this.routes[i]
            };
        }

        for (let i = 0; i < this.routes.length; i++) {
            let currentRoute = this.routes[i].slug;
            let currentTruck: ITransport;
            let currentCar: ITransport;
            let largeKG = total.packagesByRoutes[currentRoute].largePackagesKG;
            let smallKG = total.packagesByRoutes[currentRoute].smallPackagesKG;
            
            while(largeKG) {
                currentTruck = new Truck();

                while(currentTruck.countLoaded() < currentTruck.loadCapacity && largeKG > 0) {
                    let currentPackage = ordersCopy.findIndex(p => { return p.route === i && p.weight > 2 });
                    currentTruck.goods.push(ordersCopy[currentPackage]);
                    this.loadedOrders.push(ordersCopy[currentPackage].id);
                    largeKG -= ordersCopy[currentPackage].weight;
                    ordersCopy.splice(currentPackage, 1);
                    if (currentTruck.countLoaded() === currentTruck.loadCapacity) {
                        setting[currentRoute].trucks.push(currentTruck);

                        if (largeKG > 0) {
                            currentTruck = new Truck();
                        } else {
                            currentTruck = null;
                        }
                    } 
                }
            }

            while(smallKG) {
                currentCar = new Car();

                while(currentCar.countLoaded() < currentCar.loadCapacity && smallKG) {
                    let currentPackage = ordersCopy.findIndex(p => { return p.route === i && p.weight === 2 });
                    currentCar.goods.push(ordersCopy[currentPackage]);
                    this.loadedOrders.push(ordersCopy[currentPackage].id);
                    smallKG -= ordersCopy[currentPackage].weight;
                    ordersCopy.splice(currentPackage, 1);
                    if (currentCar.countLoaded() === currentCar.loadCapacity) {
                        setting[currentRoute].cars.push(currentCar);

                        if (smallKG > currentCar.loadCapacity) {
                            currentCar = new Car();
                        } else if (smallKG < currentCar.loadCapacity && currentTruck) {
                            while (smallKG) {
                                let currentPackage = ordersCopy.findIndex(p => { return p.route === i && p.weight === 2});
                                currentTruck.goods.push(ordersCopy[currentPackage]);
                                this.loadedOrders.push(ordersCopy[currentPackage].id);
                                ordersCopy.splice(currentPackage, 1);
                                smallKG -= 2;
                                if (currentTruck.countLoaded() === currentTruck.loadCapacity) {
                                    setting[currentRoute].trucks.push(currentTruck);
                                }
                            }
                            if (smallKG) {
                                currentCar = new Car();
                            }
                        }
                    }
                    
                }
            }

            if (currentTruck) {
                setting[currentRoute].trucks.push(currentTruck);
            }
            
            if (currentCar) {
                setting[currentRoute].cars.push(currentCar);
            }
        }

        return setting;
    }

    sendAutos = () => {
        this.orders.filter(o => {
            return this.loadedOrders.indexOf(o.id) >= 0;
        });
    }

    signRestPackages = () => {
        this.orders.forEach(o => {
            o.late = true;
        });
    }
}