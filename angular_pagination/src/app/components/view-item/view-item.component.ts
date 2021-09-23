import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {
  product:any;
  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private location:Location) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.apiService.getProduct(id).subscribe(product => this.product=product)
  }

  goBack(){
    this.location.back();
  }

}
