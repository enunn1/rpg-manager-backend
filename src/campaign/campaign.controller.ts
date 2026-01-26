import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CampaignService } from "./campaign.service";
import { CreateCampaignDto } from "./dto/create-campaign.dto";

@UseGuards(JwtAuthGuard)
@Controller('campaigns')
export class CampaignController {

    constructor(private campaignService: CampaignService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createCampaign(@Req() req, @Body() dto: CreateCampaignDto) {
        return this.campaignService.createCampaign(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('user')
    getUserCampaigns(@Req() req) {
        return this.campaignService.getUserCampaigns(req.user.id);
    }
}