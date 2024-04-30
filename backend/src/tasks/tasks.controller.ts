import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post("new")
  @ApiOperation({summary: "Create a new task"})
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get("list")
  @ApiOperation({summary: "List all tasks"})
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: "Get a task by ID"})
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({summary: "Update a task by ID"})
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete('delete/:id')
  @ApiOperation({summary: "Delete a task by ID"})
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
