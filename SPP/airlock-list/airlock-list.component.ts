import { Component, OnInit } from '@angular/core';
import { fadeInRightAnimation } from 'src/@shell/animations/fade-in-right.animation';
import { fadeInUpAnimation } from 'src/@shell/animations/fade-in-up.animation';

@Component({
  selector: 'spp-airlock-list',
  templateUrl: './airlock-list.component.html',
  styleUrls: ['./airlock-list.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class AirlockListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
