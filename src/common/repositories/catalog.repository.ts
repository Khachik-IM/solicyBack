import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CatalogDocument } from '../schemas';
import { Catalog } from 'src/api/catalog/entities/catalog.entity';

@Injectable()
export class CatalogRepository {
  constructor(
    @InjectModel(Catalog.name)
    private catalogModel: Model<CatalogDocument>,
  ) {}

  async create(data: Catalog): Promise<Catalog> {
    return this.catalogModel.create(data);
  }

  async findOne(query) {
    return this.catalogModel.findOne(query);
  }

  async findById(id: ObjectId): Promise<Catalog> {
    const catalog: Catalog = await this.catalogModel.findOne({ _id: id });
    if (!catalog) throw new NotFoundException();
    return catalog;
  }

  async findByIdAndGroup(id: ObjectId): Promise<Catalog> {
    const catalog: Catalog = await this.catalogModel.findOne({ _id: id });
    if (!catalog) throw new NotFoundException();
    return catalog;
  }

  async updateOne(query, data) {
    return this.catalogModel.updateOne(query, { $set: { ...data } });
  }

  async deleteOne(_id: ObjectId) {
    return this.catalogModel.deleteOne({ _id });
  }
}
