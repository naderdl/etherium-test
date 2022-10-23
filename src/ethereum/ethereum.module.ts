import { Module } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { EthereumController } from './ethereum.controller';
import { CoinGeckoService } from './coinGecko.service';
import { HttpModule } from '@nestjs/axios';
import { EthersModule } from 'nestjs-ethers';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    HttpModule,
    EthersModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          network: configService.get('INFURA_NETWORK'),
          infura: configService.get('INFURA_ID'),
          useDefaultProvider: false,
        };
      },
    }),
  ],
  controllers: [EthereumController],
  providers: [EthereumService, CoinGeckoService],
})
export class EthereumModule {}
