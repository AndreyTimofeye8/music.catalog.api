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
import { CompositionService } from './composition.service';
import { Composition as CompositionModel } from '@prisma/client';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';
import { createOrderByDirection } from '../common/helpers';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { apiData } from '../common/constants';

@ApiTags(apiData.compositionTag)
@Controller()
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @Post('composition')
  @ApiOperation({ summary: apiData.createComposition })
  async createComposition(
    @Body()
    createCompositionDto: CreateCompositionDto,
  ): Promise<CompositionModel> {
    const { title, authorId, duration, genre } = createCompositionDto;
    return this.compositionService.createComposition({
      title,
      author: { connect: { id: +authorId } },
      duration,
      genre,
    });
  }

  @Get('compositions')
  @ApiOperation({ summary: apiData.findCompositions })
  async getCompositions(
    @Query('page') page: number,
    @Query('show') show: number,
    @Query('orderBy') orderBy: string,
  ): Promise<CompositionModel[]> {
    const offset = (+page - 1) * +show;
    const orderByDirection = createOrderByDirection(orderBy);
    return this.compositionService.compositions({
      skip: offset,
      take: +show,
      orderBy: orderByDirection,
    });
  }

  @Get('compositions/:searchString')
  @ApiOperation({ summary: apiData.findFilteredCompositions })
  async getFilteredAuthors(
    @Param('searchString') searchString: string,
  ): Promise<CompositionModel[]> {
    return this.compositionService.filteredCompositions({
      where: {
        OR: [
          { title: { contains: searchString, mode: 'insensitive' } },
          {
            author: {
              name: { contains: searchString, mode: 'insensitive' },
            },
          },
          { genre: { contains: searchString, mode: 'insensitive' } },
        ],
      },
    });
  }

  @Get('composition/:id')
  @ApiOperation({ summary: apiData.findComposition })
  async getCompositionById(@Param('id') id: string): Promise<CompositionModel> {
    const composition = await this.compositionService.composition({ id: +id });
    if (!composition) {
      throw new NotFoundException();
    }
    return composition;
  }

  @Patch('composition/:id')
  @ApiOperation({ summary: apiData.updateComposition })
  async updateComposition(
    @Param('id') id: string,
    @Body()
    updateCompositionDto: UpdateCompositionDto,
  ): Promise<CompositionModel> {
    const { title, duration, genre } = updateCompositionDto;
    return this.compositionService.updateComposition({
      where: { id: +id },
      data: { title, duration, genre },
    });
  }

  @Delete('composition/:id')
  @ApiOperation({ summary: apiData.deleteComposition })
  async deleteComposition(@Param('id') id: string): Promise<CompositionModel> {
    return this.compositionService.deleteComposition({ id: +id });
  }
}
