import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
//import { NgbModal } from '@angular-devkit/build-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(private productservice: ProductService, private modalService: NgbModal) { }
  products: any;

  ngOnInit(): void {
    this.showProducts();
  }
  open(content: any, id: number) {

    this.modalService.open(content);

  }
  open2(content: any) {

    this.modalService.open(content);

  }

  showProducts(): void {
    this.productservice.getProducts()
      .subscribe(
        product => {
          this.products = product
        },
        error => {
          console.log(error)
        }
      );
  }
  deleteProduct(name: string): void {
    this.productservice.deleteFProduct(name)
      .subscribe(
        (product) => {
          this.ngOnInit();

        },
        error => {
          console.log(error)
        }
      )
  }
  update(name: string): void {
    this.productservice.updateProduct(name, this.product.value).subscribe(
      data => {
        this.ngOnInit();
        this.product.reset();
      },
      error => {
        console.log(error)
      }

    )

  }
  addProduct(): void {
    this.productservice.addProduct(this.product.value).subscribe(
      data => {
        this.ngOnInit();
        this.product.reset();
      },
      error => {
        console.log(error)
      }

    )

  }
}
