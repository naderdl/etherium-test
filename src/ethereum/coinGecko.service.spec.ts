import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CoinGeckoService } from './coinGecko.service';

describe('CoinGeckoService', () => {
  let service: CoinGeckoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule.forRoot()],
      providers: [CoinGeckoService],
    }).compile();

    service = module.get<CoinGeckoService>(CoinGeckoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a number', async () => {
    const result = await service.getEthereumToUSD();
    expect(typeof result).toBe('number');
  });
});
