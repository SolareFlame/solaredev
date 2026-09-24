import { Injectable, Logger } from '@nestjs/common';
import type { CreateContactDto } from './dto/create-contact.dto.js';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  /** Placeholder delivery: the message is only logged. Plug a mailer (SMTP, Resend…) here. */
  submit(contact: CreateContactDto): void {
    this.logger.log(`New contact message: ${JSON.stringify(contact)}`);
  }
}
