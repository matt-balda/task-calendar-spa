import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return this.prisma.tasks.create({ data: createTaskDto });
  }

  findAll() {
    return this.prisma.tasks.findMany();
  }

  findOne(id: number) {
    return this.prisma.tasks.findUnique({
      where: { id }
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.tasks.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prisma.tasks.delete({ where: { id } });
  }

  viewTasksByDay(day: Date) {
    const startOfDay = new Date(
      Date.UTC(day.getUTCFullYear(), day.getUTCMonth(), day.getUTCDate()),
    );
    const endOfDay = new Date(
      Date.UTC(
        day.getUTCFullYear(),
        day.getUTCMonth(),
        day.getUTCDate(),
        23,
        59,
        59,
        999,
      ),
    );

    return this.prisma.tasks.findMany({
      where: {
        AND: [{ date: { gte: startOfDay } }, { date: { lte: endOfDay } }],
      },
    });
  }

  viewTasksByWeek(date: Date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate());
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + 7);

    return this.prisma.tasks.findMany({
      where: {
        date: {
          gte: startOfWeek,
          lte: endOfWeek,
        },
      },
    });
  }

  viewTasksByMonth(date: Date) {
    const startOfMonth = moment(date).startOf('month').toDate();
    const endOfMonth = moment(date).endOf('month').toDate();
    return this.prisma.tasks.findMany({
      where: {
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });
  }
}
