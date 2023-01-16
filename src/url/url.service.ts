import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { isURL } from 'class-validator';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private repo: Repository<Url>,
  ) {}

  async create(createUrlDto: CreateUrlDto) {
    const { longUrl } = createUrlDto;

    //checks if longurl is a valid URL
    if (!isURL(longUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    const urlCode = nanoid(10);
    const baseURL = 'http://localhost:3000';

    try {
      //check if the URL has already been shortened
      let url = await this.repo.findOneBy({ longUrl });
      console.log(url);
      //return it if it exists
      if (url) return url.shortUrl;

      //if it doesn't exist, shorten it
      const shortUrl = `${baseURL}/${urlCode}`;

      const description = 'testing';
      //add the new record to the database
      url = this.repo.create({
        urlCode,
        longUrl,
        shortUrl,
        description,
      });

      this.repo.save(url);
      console.log(url.shortUrl);
      return url.shortUrl;
    } catch (error) {
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async redirect(urlCode: string) {
    try {
      const url = await this.repo.findOneBy({ urlCode });
      if (url) return url.longUrl;
    } catch (error) {
      throw new NotFoundException('Resource Not Found');
    }
  }

  findAll() {
    return `This action returns all url`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
