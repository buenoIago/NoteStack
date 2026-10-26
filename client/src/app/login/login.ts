import { Component } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  imports: [Navbar, RouterLink],
  selector: 'app-login',
  templateUrl: './login.html',
})

export class Login {
  cadastro = false;

  constructor(private route: ActivatedRoute) {
    this.cadastro = this.route.snapshot.routeConfig?.path === 'cadastro';
  }
}
