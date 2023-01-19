import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Link } from './entities/link.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    try {
      /**
       * Perform all needed checks
       */
      const link = await this.linksRepository.create(createLinkDto);
      await this.linksRepository.save(link);
      Logger.log('create - Created Link');
      return link;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  findAll() {
    return this.linksRepository.find();
  }

  findOne(id: string) {
    return this.linksRepository.findOneBy({ _id: new ObjectID(id) });
  }

  update(id: string, updateLinkDto: UpdateLinkDto) {
    try {
      return this.linksRepository.update(new ObjectID(id), updateLinkDto);
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }

  remove(id: string) {
    return this.linksRepository.delete({ _id: new ObjectID(id) });
  }
}
