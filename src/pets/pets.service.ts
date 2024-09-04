import { Injectable } from '@nestjs/common';
import { Pet } from './pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { OwnerService } from 'src/owner/owner.service';
import { Owner } from 'src/owner/entities/owner.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepository: Repository<Pet>,
    private ownersService: OwnerService,
  ) {}

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

  async getOwner(ownerId: number): Promise<Owner> {
    return this.ownersService.findOne(ownerId);
  }

  async deletePet(id: number): Promise<Pet> {
    const pet = await this.petsRepository.findOne({ where: { id: id } });
    if (!pet) {
      throw new Error(`Pet with id ${id} not found`);
    }
    await this.petsRepository.delete(id);
    return pet;
  }

  async updatePet(
    id: number,
    name: string,
    type?: string,
    ownerId?: number,
  ): Promise<Pet> {
    await this.petsRepository.update(id, { name, type, ownerId });
    return this.petsRepository.findOne({ where: { id: id } });
  }
}
