import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ethereum (POST)', () => {
    return request(app.getHttpServer())
      .post('/ethereum')
      .send({
        addresses: ['0x690b9a9e9aa1c9db991c7721a92d351db4fac990'],
      })
      .expect(201);
  });
});
