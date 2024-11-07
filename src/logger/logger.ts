import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file"; // To'g'ri import

const logDir = "logs";

const dailyRotateFileTransport = new DailyRotateFile({
  filename: `${logDir}/application-%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  handleExceptions: true,
  handleRejections: true,
});

export const winstonConfig = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [dailyRotateFileTransport], 
//   new winston.transports.Console({ level: 'info' }),  // loglarni konsolga chiqarish
//     new winston.transports.File({ filename: 'app.log', level: 'info' })  // loglarni faylga yozish
 });
