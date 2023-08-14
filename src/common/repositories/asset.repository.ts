import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Asset, AssetDocument } from '../schemas';

@Injectable()
export class AssetRepository {
  constructor(
    @InjectModel(Asset.name)
    private assetModel: Model<AssetDocument>,
  ) {}

  async create(data: Asset): Promise<Asset> {
    return this.assetModel.create(data);
  }

  async findOne(query): Promise<Asset> {
    return this.assetModel.findOne(query);
  }

  async findById(id: ObjectId): Promise<Asset> {
    const asset: Asset = await this.assetModel.findOne({ _id: id });
    if (!asset) throw new NotFoundException();
    return asset;
  }

  async findByType(type: number): Promise<Asset> {
    const asset: Asset = await this.assetModel.findOne({ type });
    return asset;
  }

  async updateOne(query, data) {
    return this.assetModel.updateOne(query, { $set: { ...data } });
  }

  async deleteOne(_id: ObjectId) {
    return this.assetModel.deleteOne({ _id });
  }
}
