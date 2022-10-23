import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoinGeckoService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async getEthereumToUSD() {
    const result = await this.httpService.axiosRef.get(
      this.configService.get('COIN_GECKO_URL'),
    );
    return result.data.ethereum.usd;
  }
}
