import "dotenv/config";
import fs from "fs";
import handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import transporter from "../helpers/emailTransport.js";
import { systemLogs } from "./Logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
  // In the current directory look for a folder called template
  try {
    const sourceDirectory = fs.readFileSync(
      path.join(__dirname, template),
      "utf8"
    );
    // In the template directory we're gonna use handlebars to compile all the email templates
    const compiledTempplate = handlebars.compile(sourceDirectory);

    const emailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: subject,
      html: compiledTempplate(payload),
    };
    await transporter.sendEmail(emailOptions);
  } catch (error) {
    systemLogs.error(`email not sent: ${error}`);
  }
};

export default sendEmail;
