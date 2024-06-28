import { ApiProperty } from '@nestjs/swagger';

export class CreateKnowledgeBaseDto {
  @ApiProperty({ example: 'How to reset your password' })
  title: string;

  @ApiProperty({ example: 'Here are the steps to reset your password...' })
  content: string;

  @ApiProperty({ example: 1 })
  authorId: number;
}
