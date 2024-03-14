import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { Author as AuthorModel } from '@prisma/client';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { createOrderByDirection } from '../common/helpers';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { apiData } from 'src/common/constants';

@ApiTags(apiData.authorTag)
@Controller()
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('author')
  @ApiOperation({ summary: apiData.createAuthor })
  async createAuthor(
    @Body()
    createAuthorData: CreateAuthorDto,
  ): Promise<AuthorModel> {
    const { name, link } = createAuthorData;
    return this.authorService.createAuthor({
      name,
      link,
    });
  }

  @Get('authors')
  @ApiOperation({ summary: apiData.findAuthors })
  async getAuthors(
    @Query('page') page: number,
    @Query('show') show: number,
    @Query('orderBy') orderBy: string,
  ): Promise<AuthorModel[]> {
    const offset = (+page - 1) * +show;
    const orderByDirection = createOrderByDirection(orderBy);
    return this.authorService.authors({
      skip: offset,
      take: +show,
      orderBy: orderByDirection,
    });
  }

  @Get('authors/:searchString')
  @ApiOperation({ summary: apiData.findFilteredAuthors })
  async getFilteredAuthors(
    @Param('searchString') searchString: string,
  ): Promise<AuthorModel[]> {
    return this.authorService.filteredAuthors({
      where: { name: { contains: searchString, mode: 'insensitive' } },
    });
  }

  @Get('author/:id/compositions')
  @ApiOperation({ summary: apiData.findCompositionsByAuthor })
  async getCompositionsByAuthorId(
    @Param('id') id: string,
  ): Promise<AuthorModel> {
    const author = await this.authorService.getCompositionsByAuthorId({
      id: +id,
    });
    if (!author) {
      throw new NotFoundException();
    }
    return author;
  }

  @Get('author/:id')
  @ApiOperation({ summary: apiData.findAuthor })
  async getAuthorById(@Param('id') id: string): Promise<AuthorModel> {
    const author = await this.authorService.author({ id: +id });
    if (!author) {
      throw new NotFoundException();
    }
    return author;
  }

  @Patch('author/:id')
  @ApiOperation({ summary: apiData.updateAuthor })
  async updateAuthor(
    @Param('id') id: string,
    @Body()
    updateAuthorData: UpdateAuthorDto,
  ): Promise<AuthorModel> {
    const { name, link } = updateAuthorData;
    return this.authorService.updateAuthor({
      where: { id: +id },
      data: {
        name,
        link,
      },
    });
  }

  @Delete('author/:id')
  @ApiOperation({ summary: apiData.deleteAuthor })
  async deleteAuthor(@Param('id') id: string): Promise<AuthorModel> {
    return this.authorService.deleteAuthor({ id: +id });
  }
}
