import { Module } from "@nestjs/common";
import { CampaignService } from "./campaign.service.js";
import { PrismaService } from '../prisma/prisma.service.js';
import { CampaignController } from "./campaign.controller.js";

@Module({
    providers: [CampaignService, PrismaService],
    controllers: [CampaignController] 
})
export class CampaignModule {}