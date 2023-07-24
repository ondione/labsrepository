import { Component, OnInit ,ElementRef , ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.css']
})
export class ParametrageComponent implements OnInit {

  @ViewChild("sidenav",{static:false}) elem :ElementRef;
  constructor(private elementref:ElementRef) { }

  ngOnInit() {
    this.elem.nativeElement.sidenav.toggle();
  }
}
