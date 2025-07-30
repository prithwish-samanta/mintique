import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllUsers() {
    return this.appService.getAllUsers();
  }

  @Post()
  createUser() {
    return this.appService.createUser();
  }
}
