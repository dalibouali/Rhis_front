import { Droit } from "./Droit";

export interface Ecran{

    id?:number;
    name:string;
    DroitList?:Droit[];
}