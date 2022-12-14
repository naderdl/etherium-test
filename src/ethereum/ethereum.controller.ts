import { Controller, Post, Body } from '@nestjs/common';
import { EthereumService } from './ethereum.service';
import { TestEthereumDto } from './dto/test-ethereum.dto';

@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Post()
  getBalanceSorted(@Body() testEthereumDto: TestEthereumDto) {
    return this.ethereumService.getBalanceSorted(testEthereumDto);
  }
}
