import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumController } from './ethereum.controller';
// import { EthersModule } from 'src/ethers/ethers.module';
import { CoinGeckoService } from './coinGecko.service';
import { HttpModule } from '@nestjs/axios';
import { EthersModule } from 'nestjs-ethers';
@Module({
  imports: [
    HttpModule,
    EthersModule.forRoot({
      network: 'mainnet',
      infura: '790904b271cd47eaa0eaf574ab606ebd',
      useDefaultProvider: false,
    }),
  ],
  controllers: [EthereumController],
  providers: [EthereumService, CoinGeckoService],
})
export class EthereumModule {}
