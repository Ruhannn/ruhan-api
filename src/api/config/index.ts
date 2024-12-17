import { config } from "dotenv";
import path from "path";

config({ path: path.join(process.cwd(), ".env") });

export default {
    port: process.env.PORT || 5000,
    notion_token: process.env.NOTION_TOKEN,
    project_database_id: process.env.PROJECT_DATABASE_ID!,
    skill_database_id: process.env.SKILL_DATABASE_ID!,
};