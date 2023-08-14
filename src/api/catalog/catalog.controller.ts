import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ObjectId } from 'mongoose';
import { Catalog } from './entities/catalog.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { ValidationMongoIdPipe } from 'src/common/pipes';
import { FormattedCatalogDto } from './dto/res-catalog.dto';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}
  @Get('/:id')
  getCatalog(
    @Param('id', ValidationMongoIdPipe) id: ObjectId,
  ): Promise<FormattedCatalogDto> {
    return this.catalogService.getCatalog(id);
  }

  @Post('')
  createCatalog(@Body() createCatalogDto: CreateCatalogDto): Promise<Catalog> {
    return this.catalogService.createCatalog(createCatalogDto);
  }
}
