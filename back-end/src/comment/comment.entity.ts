import { UserEntity } from '../user/user.entity';
import { Entity, JoinColumn, ManyToOne, Column } from 'typeorm';
import { Base } from '../utils/base';
import { VideoEntity } from '../video/video.entity';

@Entity('Comment')
export class CommentEntity extends Base {

    @Column({ default: '', type: 'text'})
    message: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => VideoEntity, video => video.comments)
    @JoinColumn({ name: 'video_id' })
    video: UserEntity
}