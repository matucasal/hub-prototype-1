import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor() {}

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {}

  create(reportDto: CreateReportDto) {
    //const report = this.repo.create(reportDto);
    //report.user = user;
    //return this.repo.save(report);
  }

  async changeApproval(id: number, approved: boolean) {}
}
