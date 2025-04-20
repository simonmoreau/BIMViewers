import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xbim',
  standalone: false,
  templateUrl: './xbim.component.html',
  styleUrl: './xbim.component.scss'
})
export class XbimComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    
    // var viewer = new Viewer('viewer-3d');
    // viewer.on('loaded', () => {
    //     viewer.show(ViewType.DEFAULT);
    // });
    // viewer.load('../data/SampleHouse.wexbim');
    // viewer.start();
  }

}
