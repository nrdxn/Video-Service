import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/video.dto';
import { VideoEntity } from './video.entity';

@Injectable()
export class VideoService {
    constructor (
        @InjectRepository(VideoEntity)
        private readonly videoRepository: Repository<VideoEntity>,
    ) {}

    async findVideoById (id: number, isPublic: boolean) {
        const videoInDb = await this.videoRepository.findOne({
            where: isPublic ? {
                id, isPublic: true
            } : {
                id
            },
            relations: {
                user: true,
                comments: {
                    user: true
                }
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true,
                    subscribersCount: true,
                    subscriptions: true
                },
                comments: {
                    message: true,
                    id: true,
                    user: {
                        id: true,
                        name: true,
                        avatarPath: true,
                        isVerified: true,
                        subscribersCount: true
                    }
                }
            }
        })

        if (!videoInDb) throw new NotFoundException('Видео не найдено')
    }

    async getAll () {
        return (await this.videoRepository.find())
    }

}
