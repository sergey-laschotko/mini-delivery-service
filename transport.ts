import { genID } from "./lib/lib";
import { IPackage } from "./packages";

export interface ITransport {
    loadCapacity: number;
    id: string;
    goods: IPackage[];
    countLoaded: () => number;
}

export class Auto implements ITransport {
    name: string;
    loadCapacity: number;
    id: string;
    goods: IPackage[] = [];

    getName = () => {
        return `${this.name} [${this.id}]`;
    }

    countLoaded = () => {
        let loaded: number = 0;
        
        for (let i = 0; i < this.goods.length; i++) {
            loaded += this.goods[i].weight;
        }

        return loaded;
    }
}

export class Car extends Auto {
    name: string = "Car";
    loadCapacity: number = 100;
    id: string = genID();

    constructor() {
        super();
    }
}

export class Truck extends Auto {
    name: string = "Truck";
    loadCapacity: number = 5000;
    id: string = genID();

    constructor() {
        super();
    }
}