import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { BuyProductDto } from './dto/buy-product.dto';
import { ResBuyProductDto } from './dto/res-buy-product.dto';
import { ResTransformerInterceptor } from 'src/common/interceptors/res-transform.interceptor';

@Controller('')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/buyProduct')
  @UseInterceptors(new ResTransformerInterceptor())
  buyProduct(@Body() buyProductDto: BuyProductDto): Promise<ResBuyProductDto> {
    return this.productService.buyProduct(buyProductDto);
  }
}
