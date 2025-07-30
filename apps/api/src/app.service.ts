import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async createUser() {
    const email = `test-${Date.now()}@example.com`;

    return this.prisma.user.create({
      data: {
        email: email,
        name: "Test User",
      },
    });
  }
}
