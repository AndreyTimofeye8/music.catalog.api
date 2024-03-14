import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Author, Prisma } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async author(
    postWhereUniqueInput: Prisma.AuthorWhereUniqueInput,
  ): Promise<Author | null> {
    return this.prisma.author.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async authors(params: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.AuthorOrderByWithRelationInput;
  }): Promise<Author[]> {
    const { skip, take, orderBy } = params;
    return this.prisma.author.findMany({
      skip,
      take,
      orderBy,
    });
  }

  async filteredAuthors(params: {
    where: Prisma.AuthorWhereInput;
  }): Promise<Author[]> {
    const { where } = params;
    return this.prisma.author.findMany({ where });
  }

  async getCompositionsByAuthorId(
    postWhereUniqueInput: Prisma.AuthorWhereUniqueInput,
  ): Promise<Author | null> {
    return this.prisma.author.findUnique({
      where: postWhereUniqueInput,
      include: { compositions: true },
    });
  }

  async createAuthor(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prisma.author.create({
      data,
    });
  }

  async updateAuthor(params: {
    where: Prisma.AuthorWhereUniqueInput;
    data: Prisma.AuthorUpdateInput;
  }): Promise<Author> {
    const { where, data } = params;
    return this.prisma.author.update({
      where,
      data,
    });
  }

  async deleteAuthor(where: Prisma.AuthorWhereUniqueInput): Promise<Author> {
    return this.prisma.author.delete({
      where,
    });
  }
}
