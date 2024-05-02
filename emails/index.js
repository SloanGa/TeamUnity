const nodemailer = require("nodemailer");
const sparkPostTransporter = require("nodemailer-sparkpost-transport");
// const env = require(`../environment/${process.env.NODE_ENV}`);
const path = require("path");
const pug = require("pug");

class Email {
  constructor() {
    this.from = "TeamUnity <no-reply@teamunity.site>";
    if (process.env.NODE_ENV === "production") {
      this.transporter = nodemailer.createTransport(
        sparkPostTransporter({
          sparkPostApiKey: "a6b4300799f6d8a059a981da1c9459553fd743ac",
          endpoint: "https://api.eu.sparkpost.com",
        })
      );
    } else {
      this.transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e878dfdc7c4526",
          pass: "93db6552b19a69",
        },
      });
    }
  }
  async sendEmailVerification(options) {
    try {
      const email = {
        from: this.from,
        subject: "Veuillez confirmer votre adresse e-mail",
        to: options.to,
        html: pug.renderFile(
          path.join(__dirname, "/templates/email-verification.pug"),
          {
            username: options.username,
            url: `https://${options.host}/users/email-verification/${options.userId}/${options.token}`,
          }
        ),
      };
      const response = await this.transporter.sendMail(email);
      console.log(response);
    } catch (e) {
      throw e;
    }
  }
}
module.exports = new Email();
