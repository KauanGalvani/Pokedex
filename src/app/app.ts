import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';

@Component({
  imports: [Navbar],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Pokedex');
}
