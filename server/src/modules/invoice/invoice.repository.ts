import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { InvoiceCreationAttrs, InvoiceUpdateAttrs } from "./invoice.types";
import { Invoice } from "./invoice.model";

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectModel(Invoice)
    private readonly invoiceModel: typeof Invoice
  ) {}

  async createInvoice(attrs: InvoiceCreationAttrs): Promise<Invoice> {
    const invoice = await this.invoiceModel.create(attrs);
    return invoice;
  }
  async findOneByStripeId(stripeInvoiceId: string) {
    return this.invoiceModel.findOne({
      where: { stripeInvoiceId },
    });
  }
  async findOneById(id: number) {
    return this.invoiceModel.findByPk(id);
  }
  async updateInvoice(stripeInvoiceId: string, attrs: InvoiceUpdateAttrs) {
    return this.invoiceModel.update(attrs, {
      where: { stripeInvoiceId },
    });
  }
}
