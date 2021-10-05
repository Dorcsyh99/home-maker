import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expert-all',
  templateUrl: './expert-all.component.html',
  styleUrls: ['./expert-all.component.scss']
})
export class ExpertAllComponent implements OnInit {

  fields: string[] = ['Tetőfedő', 'Asztalos', 'Villanyszerelő', 'Festő-mázoló', 'Vízvezetékszerelő', 'Lakatos', 'Kertész', 'Takarító', 'Lakberendező', 'Autószerelő', 'Egyéb'];
  counties: string[] = ['Pest', 'Komárom-Esztergom', 'Győr-Moson-Sopron', 'Somogy', 'Fejér', 'Zala', 'Vas', 'Tolna', 'Heves', 'Csongrád', 'Jász-Nagykun-SZolnok', 'Bács-Kiskun', 'Borsod-Abaúj-Zemplén', 'Baranya', 'Békés', 'Nógrád', 'Veszprém', 'Hajdú-Bihar', 'Szabolcs-Szatmár-Bereg'];

  constructor() { }

  ngOnInit(): void {
    this.fields.sort();
  }

}
