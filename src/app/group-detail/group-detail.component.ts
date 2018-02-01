import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  subgroup:string;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.subgroup = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    var test = this.route.snapshot.paramMap.get('id');
    console.log(test)
  }

}
