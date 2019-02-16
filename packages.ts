import { genID, genRandom } from "./lib/lib";
import { routes } from "./config";

export interface IPackage {
    weight: number,
    route: number,
    id: string,
    late: boolean
}

class Package implements IPackage {
    weight: number;
    route: number;
    id: string;
    late: boolean;
}

export class SmallPackage extends Package {
    weight: number = 2;
    route: number = genRandom(0, routes.length - 1);
    id: string = genID();
    late: boolean = false;

    constructor() {
        super();
    }
}

export class LargePackage extends Package {
    weight: number = 50;
    route: number = genRandom(0, routes.length - 1);
    id: string = genID();
    late: boolean = false;

    constructor() {
        super();
    }
}