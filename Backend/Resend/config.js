import {Resend} from "resend";
import "dotenv/config";
import env from "envgaurd";

const api_key = env("API_KEY");

export const resend = new Resend(api_key);
