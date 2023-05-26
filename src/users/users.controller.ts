import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post,
  Put
} from "@nestjs/common";
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {

  constructor(
    private userService: UsersService
  ) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return  this.userService.update(id, updateUserDto);
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return  this.userService.remove(id);
  }

}
