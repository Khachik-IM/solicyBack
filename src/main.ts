import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  const configs: ConfigService = app.get(ConfigService);
  const port = configs.get<number>('PORT');
  const NODE_ENV = configs.get<number>('NODE_ENV');
  const logger = new Logger('Solicy_Back');
  await app.listen(port, () => {
    logger.log(`http://...:${port}`);
    logger.log(`${NODE_ENV}`);
  });
}
bootstrap();
