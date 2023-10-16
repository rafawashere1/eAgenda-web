import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-line-loading',
  templateUrl: './line-loading.component.html',
  styleUrls: ['./line-loading.component.css'],
})
export class LineLoadingComponent {
  @Input() tamanho = 2;
}