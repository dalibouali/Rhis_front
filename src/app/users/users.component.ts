import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

public users:User[]=[];
public deleteUser:User|null=null;
public editUser:User|null=null;
  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.getUsers();
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


  }

  
