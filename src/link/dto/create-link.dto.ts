import { IsNotEmpty, IsUrl } from 'class-validator';
export class CreateLinkDto {
  description: string;

  @IsNotEmpty()
  @IsUrl({ allow_protocol_relative_urls: true })
  url: string;
}
