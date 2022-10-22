import { Module } from '@nestjs/common';
import { EthereumModule } from './ethereum/ethereum.module';

@Module({
  imports: [EthereumModule],
})
export class AppModule {}
