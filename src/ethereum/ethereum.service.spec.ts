import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { EthersModule } from 'nestjs-ethers';
import { CoinGeckoService } from './coinGecko.service';
import { EthereumService } from './ethereum.service';

describe('EthereumService', () => {
  let service: EthereumService;

  beforeEach(async () => {
    jest.setTimeout(60000);
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, EthersModule.forRoot()],
      providers: [EthereumService, CoinGeckoService],
    }).compile();

    service = module.get<EthereumService>(EthereumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should check the address is correct', async () => {
    const addresses = ['0x30824cb687e2768d239c84b69b242d4da9808d32'];
    const result = await service.create({ addresses });
    expect(result.sorted_addresses[0].address).toBe(addresses[0]);
  });

  it('should check the address is wrong', async () => {
    const addresses = ['string'];
    const result = await service.create({ addresses });
    expect(result.wrong_addresses[0]).toBe(addresses[0]);
  });

  it('should sort addresses based on balance', async () => {
    const addresses = [
      '0x30824cb687e2768d239c84b69b242d4da9808d32',
      '0xbd82de7c06f5c2088e05bc93f5998491b11bf81a',
    ];
    const result = await service.create({ addresses });
    expect(result.sorted_addresses[0].address).toBe(addresses[0]);
    expect(result.sorted_addresses[1].address).toBe(addresses[1]);
  });
});
