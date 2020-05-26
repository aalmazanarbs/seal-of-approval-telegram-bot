import { HttpModule, Module, Global } from '@nestjs/common';
import { PullRequestService } from './pull-request.service';
import { BitbucketClientService } from './bitbucket-client.service';

@Global()
@Module({
    imports: [
        HttpModule.register({ headers: { 'Authorization': `Basic ${process.env.BITBUCKET_AUTHORIZATION}` } })
    ],
    providers: [BitbucketClientService, PullRequestService],
    exports: [PullRequestService]
})
export class ApprovalModule { }
