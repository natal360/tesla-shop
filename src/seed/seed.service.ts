import { Injectable } from '@nestjs/common';
import { ProductsService } from './../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsServece: ProductsService
  ){}
  
  async runSeed(){
    await this.insertNewProducts();

    return 'SEED EXECUTED'
  }

  private async insertNewProducts(){
    await this.productsServece.deleteAllProducts();

    const products = initialData.products;

    const insertPromise = [];

    products.forEach((product) => {
      insertPromise.push(this.productsServece.create( product ));
    })

    await Promise.all( insertPromise );

    return true;
  }
}
