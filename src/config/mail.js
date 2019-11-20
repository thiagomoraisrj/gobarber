export default {
  host: process.env.MAIL_HOST,
  pórt: process.env.MAIL_PORT,
  secure: false,
  auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
  default: {
    from: 'Equipe GoBarber <norely@gobarber.com>',
  },
};
