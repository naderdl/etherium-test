import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { BaseProvider, EthersModule, getEthersToken } from 'nestjs-ethers';
import { CoinGeckoService } from './coinGecko.service';
import { EthereumController } from './ethereum.controller';
import { EthereumService } from './ethereum.service';

describe('EthereumController', () => {
  let controller: EthereumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EthersModule.forRoot()],
      controllers: [EthereumController],
      providers: [
        EthereumService,
        CoinGeckoService,
        {
          provide: getEthersToken(BaseProvider.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EthereumController>(EthereumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
