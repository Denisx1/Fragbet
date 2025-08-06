import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Invoice } from "./invoice.model";
import { InvoiceRepository } from "./invoice.repository";

@Module({
  imports: [SequelizeModule.forFeature([Invoice])],

  providers: [InvoiceRepository],
  exports: [InvoiceRepository],
})
export class InvoiceModule {}
