import { ProductData } from 'frame/tools/interfaces';

export class Product {
  public id: number;

  public title: string;

  public price: number;

  public discountPercentage: number;

  public stock: number;

  public rating: number;

  public brand: string;

  public category: string;

  public description: string;

  public thumbnail: string;

  public images: string[];

  constructor(public product: ProductData) {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.discountPercentage = product.discountPercentage;
    this.stock = product.stock;
    this.rating = product.rating;
    this.brand = product.brand;
    this.category = product.category;
    this.description = product.description;
    this.thumbnail = product.thumbnail;
    this.images = product.images;
  }
}
