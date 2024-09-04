import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateOwnerInput {
  @IsAlpha()
  @Field()
  name: string;
}
