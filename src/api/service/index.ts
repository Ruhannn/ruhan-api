/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from '@notionhq/client';
import config from '../config';


export default class NotionService {
    client: Client;
    constructor() {
        this.client = new Client({ auth: config.notion_token });
    }
    async getProjects() {
        const database = config.project_database_id;

        const response = await this.client.databases.query({
            database_id: database,
            filter: {
                property: 'published',
                checkbox: {
                    equals: true,
                },
            },
            sorts: [
                {
                    property: 'Name',
                    direction: 'ascending',
                },
            ],
        });

        return response.results.map(((a: any) => {
            return {
                id: a.id,
                name: a.properties.Name.title[0].plain_text,
                iconReference: a.icon.external.url,
                repoUrl: a.properties.repoUrl.url,
                url: a.properties.url.url,
                tagline: a.properties.tagline.rich_text[0].plain_text,
                what: a.properties.what.rich_text[0].plain_text
            }
        }))
    }
    async addViews(pageId: string) {
        const page: any = await this.client.pages.retrieve({ page_id: pageId });
        const currentViews = page.properties.views?.number || 0;
        await this.client.pages.update({
            page_id: pageId,
            properties: {
                views: {
                    number: currentViews + 1,
                },
            },
        });
    }
}