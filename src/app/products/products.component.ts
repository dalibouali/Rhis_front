import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
//import { NgbModal } from '@angular-devkit/build-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from '../token-storage.service';
import { PrevilegeService } from '../previlege.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  ProductPrev = JSON.parse(window.localStorage.getItem('privileges'))['ListProduct'];
  product = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(private productservice: ProductService, private modalService: NgbModal, private previlege: PrevilegeService, private tokenstorage: TokenStorageService, private router: Router) { }
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

    if (this.previlege.canRead(this.ProductPrev)) {
      this.productservice.getProducts()
        .subscribe(
          product => {
            this.products = product
          },
          error => {
            console.log(error)
          }
        );
    } else {
      this.router.navigate(['/login']);

    }

  }
  deleteProduct(name: string): void {
    if (this.previlege.canWrite(this.ProductPrev)) {
      this.productservice.deleteFProduct(name)
        .subscribe(
          (product) => {
            this.ngOnInit();

          },
          error => {
            console.log(error)
          }
        )
    } else {
      alert("you are unauthorized to delete a product")


    }
  }
  update(name: string): void {
    console.log(this.previlege.canUpdate(this.ProductPrev))
    if (this.previlege.canUpdate(this.tokenstorage.getListProduct())) {
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
    else {
      alert("you are unauthorized to update a product")
    }

  }
  addProduct(): void {
    if (this.previlege.canWrite(this.ProductPrev)) {
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
    else {
      alert("you are unauthorized to add a product")
    }
  }
}
