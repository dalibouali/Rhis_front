import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PrevilegeService {

  constructor() { }


  canRead(Key: number) {
    var binary = Number(Key).toString(2);


    if (binary[binary.length - 1] === '1')
      return true;
    else
      return false;
  }
  canWrite(Key: number) {
    var binary = Number(Key).toString(2);

    if (binary[binary.length - 2] === '1')
      return true;
    else
      return false;
  }
  canUpdate(Key: number) {
    var binary = Number(Key).toString(2);
    console.log(binary)
    console.log(binary[binary.length - 3])

    if (binary[binary.length - 3] === '1')
      return true;
    else
      return false;
  }
}
