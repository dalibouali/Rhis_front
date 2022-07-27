import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
public ecran:Ecran|null=null;
public role:Role|null=null;
public droit:Droit|null=null;
public editDroit:Droit|null=null;
 


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
   //for (var role of this.roles)
   //console.log(role.name)
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
      this.editDroit=droit;
     
    
    }
    container?.appendChild(button);
    button.click();
}

public OnAddDroit(addForm:NgForm):void{

  const btn=document.getElementById('add-user-form');

  const json=addForm.value
  


  //console.log(json)
  //console.log(json.ecran)
  let ecran_name="p"
  if(json.ecran==="1")
  ecran_name="ListProduct";
  else if(json.ecran==="2")
  ecran_name="ListUser";
  else if(json.ecran==="3")
  ecran_name="ListRole";
  let cum_=1
  if(json.afficher==true && json.modifier==true&& json.ajouter==true)
  cum_=7
  else if (json.afficher==true&&json.modifier==true)
  cum_=5
  else if (json.afficher==true && json.ajouter==true)
  cum_=3 
  if (json.ecran!="1" && json.ecran!="2" &&json.ecran!="3")
  alert('Erreur : veuiller choisir un ecran')
  else if (json.afficher==""||json.afficher==false)
  alert('Erreur: veuillez cocher le droit afficher comme droit minimal')
  else{
   if(btn){btn.click(); } 
  //console.log(ecran_name)
 this.ecranservice.getEcranName(ecran_name).subscribe(
    (response:Ecran)=>{
      //console.log(response)
     this.ecran=response;
     if(this.ecran) 
     {if (this.ecran.name)
      {const nom=json.name

        this.roleservice.getRole(json.name).subscribe(
          (response:Role)=>{
            this.role=response;

            if(this.role){
              if(this.role.name){
                console.log('extraction terminee')
                const dr:Droit={
                  cum:cum_
                }
                this.droitservice.addDroit(dr,this.role.id,this.ecran.id).subscribe(
                  (response:Droit)=>{
                    this.droit=response;
                    this.getDroits();
                    this.getRoles();
                    this.getEcrans();
                    addForm.reset();
                  },
                  (error:HttpErrorResponse)=>{
                    alert(error.message)
                    console.log('error')
                    addForm.reset();
                    
                  }
                )
              }
              else {console.log('creation d\'un nouveau role')
            
              const rl:Role={
                name:nom
              }
              this.roleservice.addRole(rl).subscribe(
                (response:Role)=>{
                  this.role=response;
              this.roleservice.getRole(this.role.name).subscribe(
                (response:Role)=>{
                  this.role=response;
                  const dr:Droit={
                    cum:cum_
                  }
                  this.droitservice.addDroit(dr,this.role.id,this.ecran.id).subscribe(
                    (response:Droit)=>{
                      this.droit=response;
                      this.getDroits();
                      this.getRoles();
                      this.getEcrans();
                      addForm.reset();
                    },
                    (error:HttpErrorResponse)=>{
                      alert(error.message)
                      console.log('error')
                      addForm.reset();
                      
                    }
                  )

                },
                (error:HttpErrorResponse)=>{
                  alert(error.message)
                  console.log('error')
                  
                }
              )    
                },
                (error:HttpErrorResponse)=>{
                  alert(error.message)
                  console.log('error')
                  
                }
              )
            }
            }
            else {console.log('creation d\'un nouveau role');
          
            console.log('creation d\'un nouveau role')
            
            const rl:Role={
              name:nom
            }
            this.roleservice.addRole(rl).subscribe(
              (response:Role)=>{
                this.role=response;
            this.roleservice.getRole(this.role.name).subscribe(
              (response:Role)=>{
                this.role=response;
                const dr:Droit={
                  cum:cum_
                }
                this.droitservice.addDroit(dr,this.role.id,this.ecran.id).subscribe(
                  (response:Droit)=>{
                    this.droit=response;
                    this.getDroits();
                    this.getRoles();
                    this.getEcrans();
                    addForm.reset();
                  },
                  (error:HttpErrorResponse)=>{
                    alert(error.message)
                    console.log('error')
                    addForm.reset();
                    
                  }
                )

              },
              (error:HttpErrorResponse)=>{
                alert(error.message)
                console.log('error')
                
              }
            )    
              },
              (error:HttpErrorResponse)=>{
                alert(error.message)
                console.log('error')
                
              }
            )
          }

          },
          (error:HttpErrorResponse)=>{
            alert(error.message)
            console.log('error')
            
          }
        )
      }
      else {
       alert('Erreur : ecran introuvable')
       addForm.reset();
        
      }
    }
     else 
     alert('erreur : ecran introuvable')
     addForm.reset();
     
     
    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
      addForm.reset();
      
    }
  )
  }
  
}

public checkafficher(){
  if(this.editDroit?.cum==7 || this.editDroit?.cum==5|| this.editDroit?.cum==3 ||this.editDroit?.cum==1)
  return true;
  return false;
}
public checkmodifier(){
  if(this.editDroit?.cum==7 || this.editDroit?.cum==5)
  return true;
  return false;
}
public checkajouter(){
  if(this.editDroit?.cum==7 || this.editDroit?.cum==3)
  return true;
  return false;
}

public OnUpdateDroit(updateForm:NgForm):void{

  const btn=document.getElementById('update-droit-form');
   const json=updateForm.value
   console.log(json)

  let ecran_name=json.ecran;
  let cum_=1
  if(json.afficher==true && json.modifier==true&& json.ajouter==true)
  cum_=7
  else if (json.afficher==true&&json.modifier==true)
  cum_=5
  else if (json.afficher==true && json.ajouter==true)
  cum_=3 
  if (ecran_name!="ListProduct" && ecran_name!="ListUser" &&ecran_name!="ListRole")
  alert('Erreur : veuiller choisir un ecran')
  else if (json.afficher==""||json.afficher==false||json.afficher==null)
  alert('Erreur: veuillez cocher le droit afficher comme droit minimal')
  else{
   if(btn){btn.click(); } 
  //console.log(ecran_name)
 this.ecranservice.getEcranName(ecran_name).subscribe(
    (response:Ecran)=>{
      //console.log(response)
     this.ecran=response;
     if(this.ecran) 
     {if (this.ecran.name)
      {const nom=json.name

        this.roleservice.getRole(json.name).subscribe(
          (response:Role)=>{
            this.role=response;

            if(this.role){
              if(this.role.name){
                console.log('extraction terminee')
                this.editDroit.cum=cum_
                this.droitservice.updateDroit(this.editDroit,this.role.id,this.ecran.id).subscribe(
                  (response:Droit)=>{
                    this.droit=response;
                    this.getDroits();
                    this.getRoles();
                    this.getEcrans();
                    //updateForm.reset();
                  },
                  (error:HttpErrorResponse)=>{
                    alert(error.message)
                    console.log('error')
                    //updateForm.reset();
                    
                  }
                )
              }
              else {console.log('creation d\'un nouveau role')
            
              const rl:Role={
                name:nom
              }
              this.roleservice.addRole(rl).subscribe(
                (response:Role)=>{
                  this.role=response;
              this.roleservice.getRole(this.role.name).subscribe(
                (response:Role)=>{
                  this.role=response;
                  this.editDroit.cum=cum_
                  this.droitservice.updateDroit(this.editDroit,this.role.id,this.ecran.id).subscribe(
                    (response:Droit)=>{
                      this.droit=response;
                      this.getDroits();
                      this.getRoles();
                      this.getEcrans();
                     // updateForm.reset();
                    },
                    (error:HttpErrorResponse)=>{
                      alert(error.message)
                      console.log('error')
                     // updateForm.reset();
                      
                    }
                  )

                },
                (error:HttpErrorResponse)=>{
                  alert(error.message)
                  console.log('error')
                  
                }
              )    
                },
                (error:HttpErrorResponse)=>{
                  alert(error.message)
                  console.log('error')
                  
                }
              )
            }
            }
            else {console.log('creation d\'un nouveau role');
          
            const rl:Role={
              name:nom
            }
            this.roleservice.addRole(rl).subscribe(
              (response:Role)=>{
                this.role=response;
            this.roleservice.getRole(this.role.name).subscribe(
              (response:Role)=>{
                this.role=response;
                this.editDroit.cum=cum_
                this.droitservice.updateDroit(this.editDroit,this.role.id,this.ecran.id).subscribe(
                  (response:Droit)=>{
                    this.droit=response;
                    this.getDroits();
                    this.getRoles();
                    this.getEcrans();
                   // updateForm.reset();
                  },
                  (error:HttpErrorResponse)=>{
                    alert(error.message)
                    console.log('error')
                  //  updateForm.reset();
                    
                  }
                )

              },
              (error:HttpErrorResponse)=>{
                alert(error.message)
                console.log('error')
                
              }
            )    
              },
              (error:HttpErrorResponse)=>{
                alert(error.message)
                console.log('error')
                
              }
            )
          }

          },
          (error:HttpErrorResponse)=>{
            alert(error.message)
            console.log('error')
            
          }
        )
      }
      else {
       alert('Erreur : ecran introuvable')
      // updateForm.reset();
        
      }
    }
     else 
     alert('erreur : ecran introuvable')
    // updateForm.reset();
     
     
    },
    (error:HttpErrorResponse)=>{
      alert(error.message)
     // updateForm.reset();
      
    }
  )
  }
  
}

}
