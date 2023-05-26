import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserParams, UpdateUserParams } from "../utils/types";
import { User } from "./user.entity";

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async create(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDetails: UpdateUserParams) {
    //return this.userRepository.update({ id }, updateUserDetails);
    const user = await this.userRepository.findOneBy({ id });
    user.name = updateUserDetails.name
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    //return this.userRepository.delete({ id });
    const user = await this.userRepository.findOneBy({ id });
    return this.userRepository.remove(user);
  }

}
