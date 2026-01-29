import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from "./dto/create-campaign.dto";

@Injectable()
export class CampaignService {

    constructor(private prisma: PrismaService) {}

    async createCampaign(userId: string, dto: CreateCampaignDto) {
        return this.prisma.campaign.create({
            data: {
                name: dto.name,
                description: dto.description,
                createdBy: {
                    connect: { id: userId },
                },
                members: {
                    create: {
                        user: {
                            connect: {id: userId}
                        },
                        role: 'DM',
                    },
                },
            },
            include: {
                members: true,
                createdBy: true
            },
        });
    }

    async getUserCampaigns(userId: string) {
        const campaigns = await this.prisma.campaign.findMany({
            where: {
                members: {
                    some: { userId },
                },
            }, include: {
                members: {
                    where: { userId },
                    select: { role: true }
                },
                createdBy: true,
            }, orderBy: {
                createdAt: 'desc'
            },
        });

        return campaigns;
    }

    async getCampaignById(userId: string, campaignId: string) {
        return this.prisma.campaign.findFirst({
            where: {
            id: campaignId,
            members: {
                some: { userId }
            }
            },
            include: {
            members: {
                include: {
                user: true
                }
            },
            createdBy: true
            }
        });
    }
}