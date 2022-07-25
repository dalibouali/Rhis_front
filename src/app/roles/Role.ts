import { Affectation } from "./Affectation";
import { Droit } from "./Droit";

export interface Role{

    id?:number;
    name:string;
    affectationList?:Affectation[];
    droitListR?:Droit[];
    


}