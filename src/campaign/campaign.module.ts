import { Module } from "@nestjs/common";
import { CampaignService } from "./campaign.service";
import { PrismaService } from '../prisma/prisma.service';
import { CampaignController } from "./campaign.controller";

@Module({
    providers: [CampaignService, PrismaService],
    controllers: [CampaignController] 
})
export class CampaignModule {}