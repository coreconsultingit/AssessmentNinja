import ApiService from './ApiService';

export const emailService = {
  async sendEmail(email: string, subject: string, content: string) {
    const payload = {
      email,
      subject,
      content
    };
    return await ApiService.post('/interview/send-email', payload);
  },
};