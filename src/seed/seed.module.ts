import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from './..//products/products.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    AuthModule,
  ]
})
export class SeedModule {}
