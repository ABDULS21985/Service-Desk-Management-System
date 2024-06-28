import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KnowledgeBase } from './entities/knowledge-base.entity';
import { CreateKnowledgeBaseDto } from './dto/create-knowledge-base.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(
    @InjectRepository(KnowledgeBase)
    private knowledgeBaseRepository: Repository<KnowledgeBase>,
  ) {}

  findAll(): Promise<KnowledgeBase[]> {
    return this.knowledgeBaseRepository.find({ relations: ['author'] });
  }

  findOne(id: number): Promise<KnowledgeBase> {
    return this.knowledgeBaseRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async createArticle(createKnowledgeBaseDto: CreateKnowledgeBaseDto): Promise<KnowledgeBase> {
    const article = new KnowledgeBase();
    article.title = createKnowledgeBaseDto.title;
    article.content = createKnowledgeBaseDto.content;
    article.author = { id: createKnowledgeBaseDto.authorId } as any;
    return this.knowledgeBaseRepository.save(article);
  }

  async updateArticle(id: number, article: Partial<KnowledgeBase>): Promise<KnowledgeBase> {
    await this.knowledgeBaseRepository.update(id, article);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.knowledgeBaseRepository.delete(id);
  }
}
