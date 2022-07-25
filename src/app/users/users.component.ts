import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import { Role } from '../roles/Role';
import { RoleService } from '../roles/role.service';
import { AffectationService } from '../roles/affectation.service';
import { Affectation } from '../roles/Affectation';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

public users:User[]=[];
public deleteUser:User|null=null;
public editUser:User|null=null;
public roles:Role[]=[];
public role:Role|null=null;
public addUserRole:User|null=null;
public affectations:Affectation[]=[];
public affectation:Affectation|null=null;
  constructor(private userservice:UserService,private roleservice:RoleService,private affectationservice:AffectationService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getAffectations();
  }

  public searchAffectation(user_id:number,role_id:number):boolean{

    for (let affectation of this.affectations){
      if(affectation.role.id==role_id && affectation.user.id==user_id)
      return true;
    }
    return false;
  }

  public getAffectations():void{
    this.affectationservice.getAffectations().subscribe(
      (response:Affectation[])=>{this.affectations=response;
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    )
  }

  public getRoles():void{
    this.roleservice.getRoles().subscribe(
      (response:Role[])=>{this.roles=response;
      },
      (error:HttpErrorResponse)=>{alert(error.message);}
    )
  }

  public getUsers():void{
    this.userservice.getUsers().subscribe(
      (response:User[])=>{this.users=response;},
      (error:HttpErrorResponse)=>{alert(error.message);}
    );
  }

  public OnDeleteUser(user:User|null):void{
    if(user){
      this.userservice.deleteUser(user.username).subscribe(
        (response:any)=>{
          console.log(response)
          this.getUsers();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
          console.log('error')
          
        }
      )
    }

  }


  public OnAddUser(addForm:NgForm):void{

    const btn=document.getElementById('add-user-form');

    const json=addForm.value
    console.log(json)
    if(json.password!=json.retypepassword)
    {alert('Error : password mismatch')}

    else {
    if(btn){btn.click();}

    this.userservice.addUser(addForm.value).subscribe(
      (response:User)=>{
        //console.log(response);
        this.getUsers();
        addForm.reset();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    )
    }
  }


  public OnUpdateUser(user:User):void{

    const btn=document.getElementById('update-employee-form');
    if(btn){btn.click();}

    const username=this.editUser?.username;
    if(username){
    this.userservice.updateUser(user,username).subscribe(
      (response:User)=>{
        console.log(response);
        this.getUsers();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
    }
  }


    public onOpenModal(user:User|null,mode:string):void{

      const container= document.getElementById('mycontainer');
      const button=document.createElement('button');
      button.type='button';
      button.style.display='none';
      button.setAttribute('data-toggle','modal');
      if(mode==='add'){
        button.setAttribute('data-target','#addUserModal')
      }
      if(mode==='addRole'){
        this.addUserRole=user;
        button.setAttribute('data-target','#addRoleModal')
        
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

  public OnAddRole(addForm:NgForm):void{

    const btn=document.getElementById('add-role-form');

    const json=addForm.value
    //console.log(json)
    if(json.role==null)
    alert('Erreur: veuiller selectionner un role')
    else{

      this.roleservice.getRole(json.role).subscribe(
        (response:Role)=>{
          this.role=response;
          
          if(this.searchAffectation(this.addUserRole.id,this.role.id))
          alert('erreur : affectation existe deja');
          else{
            const affect:Affectation={}
          this.affectationservice.addAffectation(affect,this.role.id,this.addUserRole.id).subscribe(
          (response:Affectation)=>{
            this.affectation=response;
            alert('l\'utilisateur '+ this.addUserRole.firstName + ' '+this.addUserRole.lastName+' est affecte au role '+this.role.name );
            this.getAffectations();
          },(error:HttpErrorResponse)=>{
            alert(error.message);
          }
          )
        }
      },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }

      )

    }

  }

  }

  
