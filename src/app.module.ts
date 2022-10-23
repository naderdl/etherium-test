import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EthereumModule } from './ethereum/ethereum.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), EthereumModule],
})
export class AppModule {}
