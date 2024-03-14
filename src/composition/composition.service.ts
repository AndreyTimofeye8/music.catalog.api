import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Composition, Prisma } from '@prisma/client';

@Injectable()
export class CompositionService {
  constructor(private prisma: PrismaService) {}

  async composition(
    compositionWhereUniqueInput: Prisma.CompositionWhereUniqueInput,
  ): Promise<Composition | null> {
    return this.prisma.composition.findUnique({
      where: compositionWhereUniqueInput,
    });
  }

  async compositions(params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.CompositionOrderByWithRelationInput;
  }): Promise<Composition[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.composition.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async filteredCompositions(params: {
    where: Prisma.CompositionWhereInput;
  }): Promise<Composition[]> {
    const { where } = params;
    return this.prisma.composition.findMany({ where });
  }

  async createComposition(
    data: Prisma.CompositionCreateInput,
  ): Promise<Composition> {
    return this.prisma.composition.create({ data });
  }

  async updateComposition(params: {
    where: Prisma.CompositionWhereUniqueInput;
    data: Prisma.CompositionUpdateInput;
  }): Promise<Composition> {
    const { where, data } = params;
    return this.prisma.composition.update({ data, where });
  }

  async deleteComposition(
    where: Prisma.CompositionWhereUniqueInput,
  ): Promise<Composition> {
    return this.prisma.composition.delete({ where });
  }
}
