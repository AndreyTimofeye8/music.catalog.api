import { ApiProperty } from '@nestjs/swagger';
import { apiData } from '../../common/constants';

export class UpdateAuthorDto {
  @ApiProperty({
    required: false,
    description: apiData.authorName,
    type: String,
  })
  name: string;

  @ApiProperty({
    required: false,
    description: apiData.authorLink,
    type: String,
  })
  link: string;
}
