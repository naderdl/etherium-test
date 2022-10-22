import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoinGeckoService {
  constructor(private readonly httpService: HttpService) {}
  async getEthereumToUSD() {
    const result = await this.httpService.axiosRef.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,&vs_currencies=usd',
    );
    return result.data.ethereum.usd;
  }
}
