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
public deleteDroit:Droit|null=null;
 


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
   for (var role of this.roles)
   console.log(role.name)
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    )
  }


  public getEcrans():void{
    this.ecranservice.getEcrans().subscribe(
      (response:Ecran[])=>{this.ecrans=response;
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    )
  }

  public OnDeleteDroit(droit:Droit|null):void{
    if(droit){
      this.droitservice.deleteDroit(droit.id).subscribe(
        (response:any)=>{
          console.log(response)
          this.getDroits();
          this.getRoles();
          this.getEcrans();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
          console.log('error')
          
        }
      )
    }

  }

  public onOpenModal(droit:Droit|null,mode:string):void{

    const container= document.getElementById('mycontainer');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addDroitModal')

    }
    if(mode==='delete'){
      button.setAttribute('data-target','#deleteDroitModal')
      this.deleteDroit=droit;
    }
    if(mode==='edit'){
     // this.editUser=user;
      button.setAttribute('data-target','#updateDroitModal')
    }
    container?.appendChild(button);
    button.click();
}
}
