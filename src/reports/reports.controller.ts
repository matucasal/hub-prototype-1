import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { Request, Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @Req() request: Request) {
    console.log('request', request);
    console.log('request.cookies.jwt', request.cookies.jwt);
    console.log('request.user', request.user);
    return this.reportsService.create(body);
  }
}
