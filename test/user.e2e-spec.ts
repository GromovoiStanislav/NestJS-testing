import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { UsersModule } from "../src/users/users.module";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../src/users/user.entity";
import { response } from "express";

describe("UsersController (e2e)", () => {
  let app: INestApplication;

  const mockUsers = [
    { id: 1, name: "Tom" },
    { id: 2, name: "Sam" }
  ];

  const mockUsersRepository = {
    find: jest.fn().mockResolvedValue(mockUsers),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({
      id: Date.now(),
      ...user
    }))
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule]
    }).overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it("/users (GET)", () => {
    return request(app.getHttpServer())
      .get("/users")
      .expect("Content-Type", /json/)
      .expect(200, mockUsers);
    //.expect(mockUsers)
  });


  it("/users (POST)", () => {
    const dto = { name: "Bob" };

    return request(app.getHttpServer())
      .post("/users")
      .send(dto)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(response => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          name: dto.name
        });
      });
  });


  it("/users (POST) --> 400 on validation error", () => {
    const dto = { name: 123 };

    return request(app.getHttpServer())
      .post("/users")
      .send(dto)
      .expect("Content-Type", /json/)
      .expect(400, {
        statusCode: 400,
        message: ["name must be a string"],
        error: "Bad Request"
      });

  });


});
