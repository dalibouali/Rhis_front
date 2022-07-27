import { Ecran } from "./Ecran";
import { Role } from "./Role";

export interface Droit {

    id?: number;
    cum: number;
    ecran?: Ecran;
    role?: Role;


}