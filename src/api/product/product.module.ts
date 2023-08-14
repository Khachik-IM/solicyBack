import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/common/schemas/product.schema';
import { ProductRepository } from 'src/common/repositories/product.repository';
import {
  Asset,
  AssetSchema,
  Catalog,
  CatalogSchema,
  User,
  UserSchema,
} from 'src/common/schemas';
import { UserRepository } from 'src/common/repositories/user.repository';
import { CatalogRepository } from 'src/common/repositories/catalog.repository';
import { AssetRepository } from 'src/common/repositories/asset.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Catalog.name, schema: CatalogSchema },
      { name: Asset.name, schema: AssetSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    UserRepository,
    CatalogRepository,
    AssetRepository,
  ],
})
export class ProductModule {}
