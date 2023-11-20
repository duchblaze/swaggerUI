import { Body, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Employee } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  // Function to truncate a string to a specified length
  truncateString = (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.substring(0, maxLength) : str;
  };

  // Your create method with the hashed password limited to 15 characters
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const {
        firstName,
        lastName,
        dob,
        email,
        status,
        dateCreated,
        phoneNo,
        password,
        gender,
      } = createUserDto;

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Limit the hashed password to 15 characters
      const limitedHashedPassword = this.truncateString(hashedPassword, 15);

      // Create a user with the limited hashed password
      const user = this.employeeRepository.create({
        firstName,
        lastName,
        dob,
        email,
        status,
        dateCreated,
        phoneNo,
        password: limitedHashedPassword, // Store the limited hashed password
        gender,
      });

      // Save the user with the limited hashed password
      return this.employeeRepository.save(user);
    } catch (error) {
      throw error;
    }
  }
  // async create(@Body() createUserDto: CreateUserDto) {
  //   try {
  //     const {
  //       firstName,
  //       lastName,
  //       dob,
  //       email,
  //       status,
  //       dateCreated,
  //       phoneNo,
  //       password,
  //     } = createUserDto;
  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const user = this.employeeRepository.create({
  //       firstName,
  //       lastName,
  //       dob,
  //       email,
  //       status,
  //       dateCreated,
  //       phoneNo,
  //       password: hashedPassword,
  //     });

  //     return this.employeeRepository.save(user);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({ where: { id: id } });
  }

  update(updateUserDto: UpdateUserDto, id: number) {
    return this.employeeRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.employeeRepository.delete(id);
  }
}
