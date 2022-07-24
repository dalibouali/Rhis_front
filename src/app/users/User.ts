import { Affectation } from "../roles/Affectation";

export interface User{

    id:number;
    username:string;
    firstName:string;
    lastName:string;
    password:string;
    affectationList:Affectation[];



}