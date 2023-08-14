import { Injectable } from '@nestjs/common';
import { Catalog } from './entities/catalog.entity';
import { CatalogRepository } from 'src/common/repositories/catalog.repository';
import { ObjectId } from 'mongoose';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { FormattedCatalogDto } from './dto/res-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(private catalogRepository: CatalogRepository) {}

  async getCatalog(id: ObjectId): Promise<FormattedCatalogDto> {
    const catalog: Catalog = await this.catalogRepository.findById(id);
    const formattedCatalog: FormattedCatalogDto = {
      id: catalog._id,
      name: catalog.name,
      description: catalog.description,
      price: {
        cost1: catalog.cost1,
        cost2: catalog.cost2,
        cost3: catalog.cost3,
      },
      req: {
        req1: catalog.req1,
        req2: catalog.req2,
        req3: catalog.req3,
      },
    };
    return formattedCatalog;
  }

  async createCatalog(createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.catalogRepository.create(createCatalogDto);
  }
}
