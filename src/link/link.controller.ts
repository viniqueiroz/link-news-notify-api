import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';

@Controller({ path: 'links', version: '1' })
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  findAll() {
    return this.linkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.linkService.findOne(id);
    if (!response) {
      throw new NotFoundException();
    }
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    const updateResponse = await this.linkService.update(id, updateLinkDto);

    if (updateResponse.affected === 0) {
      throw new NotFoundException();
    }

    return { message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteResponse = await this.linkService.remove(id);
    if (deleteResponse.affected === 0) {
      throw new NotFoundException();
    }
    return { message: 'success' };
  }
}
