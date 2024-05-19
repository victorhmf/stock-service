import nodemailer from 'nodemailer';
import EmailService from './emailService';

jest.mock('nodemailer');

describe('EmailService', () => {
  let emailService;
  let mockTransporter;

  beforeEach(() => {
    mockTransporter = {
      sendMail: jest.fn().mockResolvedValue(),
    };
    nodemailer.createTransport.mockReturnValue(mockTransporter);
    emailService = new EmailService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a transporter with correct options', () => {
      expect(nodemailer.createTransport).toHaveBeenCalledWith({
        host: process.env.EMAIL_SERVICE,
        port: process.env.EMAIL_PORT,
        tls: {
          rejectUnauthorized: false,
        },
      });
    });
  });

  describe('#sendMail', () => {
    const mockMailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test Email Body',
    };

    it('should send mail with correct options', async () => {
      await emailService.sendMail(mockMailOptions);
      
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(mockMailOptions);
    });

    it('should throw an error if sending mail fails', async () => {
      const errorMessage = 'Failed to send email';
      mockTransporter.sendMail.mockRejectedValueOnce(new Error(errorMessage));

      await expect(emailService.sendMail(mockMailOptions)).rejects.toThrow(errorMessage);
    });
  });
});
