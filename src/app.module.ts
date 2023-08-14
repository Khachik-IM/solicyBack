import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatalogModule } from './api/catalog/catalog.module';
import { UserModule } from './api/user/user.module';
import { AssetModule } from './api/asset/asset.module';
import { ProductModule } from './api/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV && process.env.NODE_ENV !== 'development'
          ? `.env.${process.env.NODE_ENV.trim()}`
          : '.env',
      ],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_CONNECTION_URL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    CatalogModule,
    UserModule,
    AssetModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
