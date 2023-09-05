import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  role: string = ''
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.role = this.authService.decodedToken().role

  
  }

}
