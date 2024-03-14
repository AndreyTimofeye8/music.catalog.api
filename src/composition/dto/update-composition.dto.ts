import { ApiProperty } from '@nestjs/swagger';
import { apiData } from '../../common/constants';

export class UpdateCompositionDto {
  @ApiProperty({
    required: false,
    description: apiData.compositionTitle,
    type: String,
  })
  title?: string;

  @ApiProperty({
    required: false,
    description: apiData.compositionDuration,
    type: Number,
  })
  duration?: number;

  @ApiProperty({
    required: false,
    description: apiData.compositionGenre,
    type: String,
  })
  genre?: string;
}
