import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

describe("UsersController", () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn(dto => Promise.resolve({
      id: Date.now(),
      ...dto
    })),

    update: jest.fn().mockImplementation((id, dto) => Promise.resolve({
      id,
      ...dto
    }))

  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService]
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = app.get<UsersController>(UsersController);
  });


  it("should be defined", () => {
    expect(controller).toBeDefined();
  });


  it("should create a user", async () => {
    const dto = { name: "Tom" };

    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name
    });

    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });


  it("should update a user", async () => {
    const dto = { name: "Tom" };

    expect(await controller.update(1, dto)).toEqual({
      id: 1,
      name: dto.name
    });

    expect(mockUsersService.update).toHaveBeenCalled();
  });

});
