import { Injectable } from '@nestjs/common';
import { Context, TelegramActionHandler, PipeContext } from 'nest-telegram';
import { PullRequestService } from '../approval/pull-request.service';
import { TelegramUserContextTransformerService } from './telegram-user-context-transformer.service';
import { PullRequest } from '../approval/pull-request';
import { User } from '../persistence/user';
import { validApproveUrlRegex } from './constants';

@Injectable()
export class TelegramApproveMessageService {

    constructor(private readonly pullRequestService: PullRequestService) { }

    @TelegramActionHandler({ message: validApproveUrlRegex })
    async approve(context: Context, @PipeContext(TelegramUserContextTransformerService) user: User): Promise<void> {
        if (user) {
            const pullRequest = this.extractPullRequestFromUrl(context.message.text);
            const approved = await this.pullRequestService.approve(pullRequest).toPromise();
            if (approved) {
                await context.reply('Done 👍');
            } else {
                await context.reply('Bot monkeys can not do nothing with this pull request 🙈');
            }
        } else {
            await context.reply('You are not allowed to request approval, type /start for register request 🤓');
        }
    }

    private extractPullRequestFromUrl(url: string): PullRequest {
        const { groups: { repository, id } } = validApproveUrlRegex.exec(url);
        return { repository, id };
    }
}
