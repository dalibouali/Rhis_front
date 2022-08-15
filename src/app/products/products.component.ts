import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
//import { NgbModal } from '@angular-devkit/build-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

import { PrevilegeService } from '../previlege.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  encryptPrev = window.localStorage.getItem('privileges');
  decrypt = CryptoJS.AES.decrypt(this.encryptPrev, "RHIS").toString(CryptoJS.enc.Utf8);

  Privileges = JSON.parse(this.decrypt)


  ProductPrev = this.Privileges['ListProduct'];




  product = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(private productservice: ProductService, private modalService: NgbModal, private previlege: PrevilegeService, private router: Router) { }
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
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    } else {
      alert("you are unauthorized to see products")


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

    if (this.previlege.canUpdate(this.ProductPrev)) {
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
  public isAffiche(): boolean {
    return this.previlege.canRead(this.ProductPrev);
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
