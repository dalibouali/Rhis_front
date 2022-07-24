import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Droit } from './Droit';
import { DroitService } from './droit.service';
import { Ecran } from './Ecran';
import { EcranService } from './ecran.service';
import { Role } from './Role';
import { RoleService } from './role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  
public droits:Droit[]=[];
public roles:Role[]=[];
public ecrans:Ecran[]=[];
 


  constructor(private droitservice:DroitService,private roleservice:RoleService,private ecranservice:EcranService) { }

  ngOnInit(): void {
    this.getDroits();
    this.getRoles();
    this.getEcrans();
    
  }
  public getDroits():void{
    this.droitservice.getDroits().subscribe(
      (response:Droit[])=>{this.droits=response;
        //console.log(this.droits[0]);
       
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    );
    
  }


  public getRoles():void{
    this.roleservice.getRoles().subscribe(
      (response:Role[])=>{this.roles=response;
      //  console.log(this.roles)
       // console.log(this.roles[0].name)
      
       //console.log(this.roles[0]);
      /*
       const essr=this.roles ;
   for (var role in essr)
    console.log(role)
    */
   for (var role of this.roles)
   console.log(role.name)
    
   //console.log(response);
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    )
  }


  public getEcrans():void{
    this.ecranservice.getEcrans().subscribe(
      (response:Ecran[])=>{this.ecrans=response;
       // console.log(this.ecrans[0]);
       // console.log(this.ecrans[0].EcranList[0].cum)
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    )
  }

  public checkEcranMAA( droit:number){

    if (droit===7)
    return false;
    else
    return true;
  }

  
  public checkEcranAA(droit:number){

    if (droit===3)
    return false;
    else
    return true;
  }
  
  public checkEcranA(droit:number){

    if (droit===1)
    return false;
    else
    return true;
  }

  /*
  public onOpenModal(user:User|null,mode:string):void{

    const container= document.getElementById('mycontainer');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addUserModal')
    }
    if(mode==='delete'){
      button.setAttribute('data-target','#deleteUserModal')
      this.deleteUser=user;
    }
    if(mode==='edit'){
      this.editUser=user;
      button.setAttribute('data-target','#updateUserModal')
    }
    container?.appendChild(button);
    button.click();
    //console.log(this.deleteUser?.firstName)
}
*/

}
