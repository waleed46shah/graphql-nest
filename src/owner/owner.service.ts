import { Injectable } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownersRepository: Repository<Owner>,
  ) {}

  async create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownersRepository.create(createOwnerInput);
    return this.ownersRepository.save(newOwner);
  }

  async findAll() {
    return this.ownersRepository.find();
  }

  async findOne(id: number) {
    return this.ownersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownersRepository.update(id, updateOwnerInput);
  }

  async remove(id: number): Promise<Owner> {
    const owner = await this.ownersRepository.findOne({ where: { id } });
    if (!owner) {
      throw new Error('Owner not found');
    }
    await this.ownersRepository.delete(id);
    return owner;
  }
}
