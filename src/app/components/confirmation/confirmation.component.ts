import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  name!: string | null;
  price!: number;

  constructor(private ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.name = this.ar.snapshot.paramMap.get('name');
    this.price = Number(this.ar.snapshot.paramMap.get('price'));
  }
}
