import { Injectable } from '@nestjs/common';
import { TestEthereumDto } from './dto/test-ethereum.dto';
import { CoinGeckoService } from './coinGecko.service';

import {
  InjectEthersProvider,
  BaseProvider,
  formatEther,
  isAddress,
} from 'nestjs-ethers';

@Injectable()
export class EthereumService {
  constructor(
    private readonly coinGeckoService: CoinGeckoService,
    @InjectEthersProvider() private readonly baseProvider: BaseProvider,
  ) {}
  async getBalanceSorted(testEthereumDto: TestEthereumDto) {
    const wrong_addresses = [];
    const right_addresses: {
      address: string;
      eth_balance: number;
      usd_balance: number;
    }[] = [];
    const usdPrice = await this.coinGeckoService.getEthereumToUSD();

    for (const address of testEthereumDto.addresses) {
      if (!isAddress(address)) {
        wrong_addresses.push(address);
      } else {
        const balance = await this.baseProvider.getBalance(address);
        const balanceAmount = parseFloat(formatEther(balance));
        right_addresses.push({
          address,
          eth_balance: balanceAmount,
          usd_balance: usdPrice * balanceAmount,
        });
      }
    }

    const sorted_addresses = right_addresses.sort(
      (address, address2) => address2.usd_balance - address.usd_balance,
    );

    return { wrong_addresses, sorted_addresses };
  }
}
