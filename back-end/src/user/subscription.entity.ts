import { Entity, ManyToOne, JoinColumn } from 'typeorm';
import { VideoEntity } from 'src/video/video.entity';
import { Base } from 'src/utils/base';
import { UserEntity } from './user.entity';

@Entity('Subscription')
export class SubscriptionEntity extends Base {

    @ManyToOne(() => UserEntity, user => user.subscriptions)
    @JoinColumn({ name: 'from_user_id' })
    fromUser: UserEntity

    @ManyToOne(() => UserEntity, user => user.subscriptions)
    @JoinColumn({ name: 'to_channel_id' })
    toChannel: VideoEntity[]
}