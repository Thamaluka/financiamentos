import { Component, OnInit } from '@angular/core';
import { User } from 'app/models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private user = new User;
  private users = [];
  constructor(private service: UserService) { }

  ngOnInit() {
  }

  sendNewUser() {
    this.service.sendNewUser(this.user).subscribe((res)=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }

}
