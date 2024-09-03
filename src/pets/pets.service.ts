import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/createPet.input';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private petsRepository: Repository<Pet>) {}

  async createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepository.create(createPetInput); //new pet =  new Pet(); newPet.name......

    return this.petsRepository.save(newPet); //insert into pet
  }

  async findAll(): Promise<Pet[]> {
    return this.petsRepository.find(); //Select * from pets
  }

  async findone(id: number): Promise<Pet> {
    return this.petsRepository.findOne({ where: { id: id } });
  }
}
