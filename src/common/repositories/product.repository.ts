import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(data: Product): Promise<Product> {
    return this.productModel.create(data);
  }

  async findOne(query): Promise<Product> {
    return this.productModel.findOne(query);
  }

  async findById(id: ObjectId): Promise<Product> {
    const product: Product = await this.productModel.findOne({ _id: id });
    if (!product) throw new NotFoundException();
    return product;
  }

  async updateOne(query, data) {
    return this.productModel.updateOne(query, { $set: { ...data } });
  }

  async deleteOne(_id: ObjectId) {
    return this.productModel.deleteOne({ _id });
  }
}
