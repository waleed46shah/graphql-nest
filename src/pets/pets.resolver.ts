import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet } from './pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { Owner } from 'src/owner/entities/owner.entity';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private petsService: PetsService) {}

  @Query((returns) => [Pet])
  pets(): Promise<Pet[]> {
    return this.petsService.findAll();
  }

  @Mutation((returns) => Pet)
  createPet(
    @Args('createPetInput') createPetInput: CreatePetInput,
  ): Promise<Pet> {
    return this.petsService.createPet(createPetInput);
  }

  @Mutation((returns) => Pet)
  updatePet(
    @Args('id', { type: () => Int }) id: number,
    @Args('name') name: string,
    @Args('type', { nullable: true }) type?: string,
    @Args('ownerId', { type: () => Int }) ownerId?: number,
  ): Promise<Pet> {
    return this.petsService.updatePet(id, name, type, ownerId);
  }

  @Mutation(() => Pet)
  deletePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.deletePet(id);
  }

  @Query((returns) => Pet)
  getPet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return this.petsService.findone(id);
  }
  @ResolveField((returns) => Owner)
  owner(@Parent() pet: Pet): Promise<Owner> {
    return this.petsService.getOwner(pet.ownerId);
  }
}
