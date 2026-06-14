import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard.js";
import { CampaignService } from "./campaign.service.js";
import { CreateCampaignDto } from "./dto/create-campaign.dto.js";

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
    async getUserCampaigns(@Req() req) {
        return this.campaignService.getUserCampaigns(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getCampiagnById(@Req() req, @Param('id') id: string) {
        return this.campaignService.getCampaignById(req.user.id, id);
    }
}