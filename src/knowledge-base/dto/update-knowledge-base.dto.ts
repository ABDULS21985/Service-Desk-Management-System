import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateKnowledgeBaseDto } from './create-knowledge-base.dto';

export class UpdateKnowledgeBaseDto extends PartialType(CreateKnowledgeBaseDto) {
  @ApiProperty({ example: 'Updated title' })
  title?: string;

  @ApiProperty({ example: 'Updated content' })
  content?: string;
}
