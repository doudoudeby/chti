export interface IChti {
    id?: number;
    name?: string;
}

export class Chti implements IChti {
    constructor(public id?: number, public name?: string) {}
}
