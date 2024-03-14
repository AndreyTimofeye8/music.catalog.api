import { ApiProperty } from '@nestjs/swagger';
import { apiData } from '../../common/constants';

export class CreateCompositionDto {
  @ApiProperty({
    required: true,
    description: apiData.compositionTitle,
    type: String,
  })
  title: string;

  @ApiProperty({
    required: true,
    description: apiData.authorId,
    type: Number,
  })
  authorId: number;

  @ApiProperty({
    required: true,
    description: apiData.compositionDuration,
    type: Number,
  })
  duration: number;

  @ApiProperty({
    required: true,
    description: apiData.compositionGenre,
    type: String,
  })
  genre: string;
}
