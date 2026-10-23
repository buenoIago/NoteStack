import { Component } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar';
import { RouterLink } from '@angular/router';

@Component({
  imports: [Navbar, RouterLink],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {}
