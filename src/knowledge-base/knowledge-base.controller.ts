import { Controller, Get, Post, Param, Delete, Body, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { KnowledgeBaseService } from './knowledge-base.service';
import { CreateKnowledgeBaseDto, UpdateKnowledgeBaseDto } from './dto';

@ApiTags('knowledge-base')
@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all knowledge base articles' })
  @ApiResponse({ status: 200, description: 'Return all knowledge base articles.' })
  findAll() {
    return this.knowledgeBaseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get knowledge base article by ID' })
  @ApiResponse({ status: 200, description: 'Return a knowledge base article.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  findOne(@Param('id') id: string) {
    return this.knowledgeBaseService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new knowledge base article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({ type: CreateKnowledgeBaseDto, examples: {
    a: {
      summary: 'Example article payload',
      description: 'A standard example of a knowledge base article payload',
      value: {
        title: 'How to reset your password',
        content: 'Here are the steps to reset your password...',
        authorId: 1,
      },
    },
  }})
  create(@Body() createKnowledgeBaseDto: CreateKnowledgeBaseDto) {
    return this.knowledgeBaseService.createArticle(createKnowledgeBaseDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a knowledge base article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  @ApiBody({ type: UpdateKnowledgeBaseDto, examples: {
    a: {
      summary: 'Example article update payload',
      description: 'An example of an article update payload',
      value: {
        title: 'Updated title',
        content: 'Updated content',
      },
    },
  }})
  update(@Param('id') id: string, @Body() updateKnowledgeBaseDto: UpdateKnowledgeBaseDto) {
    return this.knowledgeBaseService.updateArticle(+id, updateKnowledgeBaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a knowledge base article' })
  @ApiResponse({ status: 200, description: 'The article has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Article not found.' })
  remove(@Param('id') id: string) {
    return this.knowledgeBaseService.remove(+id);
  }
}
