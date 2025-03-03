import { Injectable } from '@nestjs/common';
import { CreateMediumDto } from './dto/create-medium.dto';
import { UpdateMediumDto } from './dto/update-medium.dto';

@Injectable()
export class MediumService {
  create(createMediumDto: CreateMediumDto) {
    return 'This action adds a new medium';
  }

  findAll() {
    return `This action returns all medium`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medium`;
  }

  update(id: number, updateMediumDto: UpdateMediumDto) {
    return `This action updates a #${id} medium`;
  }

  remove(id: number) {
    return `This action removes a #${id} medium`;
  }
}
