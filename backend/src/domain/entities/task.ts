import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Task {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field()
  completed: boolean;
}
