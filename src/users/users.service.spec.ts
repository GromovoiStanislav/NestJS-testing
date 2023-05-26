import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "./user.entity";

describe("UsersService", () => {
  let service: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(user => Promise.resolve({
      id: Date.now(),
      ...user
    }))
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository
        }
      ]
    }).compile();

    service = app.get<UsersService>(UsersService);
  });


  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a new user record and return that", async () => {
    const dto = { name: "Tom" };

    expect(await service.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name
    });
  });

});
