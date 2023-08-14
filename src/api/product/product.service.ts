import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/common/repositories/product.repository';
import { BuyProductDto } from './dto/buy-product.dto';
import { Catalog } from '../catalog/entities/catalog.entity';
import { CatalogRepository } from 'src/common/repositories/catalog.repository';
import { UserRepository } from 'src/common/repositories/user.repository';
import { User } from '../user/entities/user.entity';
import { AssetRepository } from 'src/common/repositories/asset.repository';
import { Asset } from '../asset/entities/asset.entity';
import { ResBuyProductDto } from './dto/res-buy-product.dto';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private catalogRepository: CatalogRepository,
    private userRepository: UserRepository,
    private assetRepository: AssetRepository,
  ) {}

  async buyProduct(buyProductDto: BuyProductDto): Promise<ResBuyProductDto> {
    const catalog: Catalog = await this.catalogRepository.findById(
      buyProductDto.id,
    );
    const user: User = await this.userRepository.findByAddress(
      buyProductDto.address,
    );
    this.checkEnoughCash(user, catalog);
    await this.checkLevel(1, catalog);
    await this.checkLevel(2, catalog);
    await this.checkLevel(3, catalog);
    user.cash1 = user.cash1 - catalog.cost1;
    user.cash2 = user.cash2 - catalog.cost2;
    user.cash3 = user.cash3 - catalog.cost3;
    await this.userRepository.updateOne({ address: user.address }, user);
    return {
      resources: {
        cash1: user.cash1,
        cash2: user.cash2,
        cash3: user.cash3,
      },
    };
  }

  checkEnoughCash(user: User, catalog: Catalog): void {
    if (
      user.cash1 < catalog.cost1 ||
      user.cash2 < catalog.cost2 ||
      user.cash3 < catalog.cost3
    ) {
      throw new BadRequestException('Not enough cash.');
    }
  }

  async checkLevel(index: number, catalog: Catalog): Promise<void> {
    if (catalog[`req${index}`] != null) {
      const asset: Asset = await this.assetRepository.findByType(index);
      if (asset && catalog[`req${index}`] < asset.level) {
        throw new BadRequestException('Not enough level.');
      }
    }
  }
}
