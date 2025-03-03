import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query, HttpCode } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post("/create")
  create(@Body() createBoardDto: CreateBoardDto) {
    console.log(createBoardDto,"createBoard DTO")
    return this.boardService.create(createBoardDto);
  }

  @Post("/list")
  @HttpCode(200)
  findAll(@Query('page') page: number = 1,@Query('limit') limit: number = 10, @Body() searchFilters: { name?: string; status?: string },) {
    return this.boardService.findAll(Number(page), Number(limit), searchFilters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
