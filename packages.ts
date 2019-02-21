import { genID, genRandom } from "./lib/lib";
import { IRoute } from "./routes";

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

    constructor(routes: IRoute[]) {
        this.route = genRandom(0, routes.length - 1);
    }
}

export class SmallPackage extends Package {
    weight: number = 2;
    id: string = genID();
    late: boolean = false;

    constructor(routes: IRoute[]) {
        super(routes);
    }
}

export class LargePackage extends Package {
    weight: number = 50;
    id: string = genID();
    late: boolean = false;

    constructor(routes: IRoute[]) {
        super(routes);
    }
}