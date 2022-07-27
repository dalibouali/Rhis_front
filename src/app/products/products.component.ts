import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
//import { NgbModal } from '@angular-devkit/build-angular';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from '../token-storage.service';
import { PrevilegeService } from '../previlege.service';

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
  constructor(private productservice: ProductService, private modalService: NgbModal, private previlege: PrevilegeService, private tokenstorage: TokenStorageService) { }
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
    if (this.previlege.canRead(this.tokenstorage.getListProduct())) {
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
  }
  deleteProduct(name: string): void {
    if (this.previlege.canWrite(this.tokenstorage.getListProduct())) {
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
  }
  update(name: string): void {
    console.log(this.previlege.canUpdate(this.tokenstorage.getListProduct()))
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

  }
  addProduct(): void {
    if (this.previlege.canWrite(this.tokenstorage.getListProduct())) {
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
}
