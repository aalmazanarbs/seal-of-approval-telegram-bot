import { Injectable, Logger } from '@nestjs/common';
import { flatMap, catchError } from 'rxjs/operators';
import { iif, of, Observable } from 'rxjs';
import { BitbucketClientService } from './bitbucket-client.service';
import { PullRequestResponse } from './dto/pull-request-response';
import { PullRequest } from './pull-request';

@Injectable()
export class PullRequestService {

    private readonly LOG = new Logger(PullRequestService.name);

    private readonly approvableBranches = new Set(['development', 'integration', 'preproduction']);
    private readonly notApprovableRepositories = new Set(process.env.NOT_APPROVABLE_REPOSITORIES.split(','));

    constructor(private readonly bitbucketClientService: BitbucketClientService) { }

    public approve(pullRequest: PullRequest): Observable<boolean> {   
        if (this.notApprovableRepositories.has(pullRequest.repository)) {
            return of(false);
        }    
        return this.bitbucketClientService.getPullRequest(pullRequest)
                                          .pipe(flatMap(pullRequestResponse => iif(() => this.isApprovable(pullRequestResponse), 
                                                    this.bitbucketClientService.approvePullRequest(pullRequest), 
                                                    of(false))),
                                                catchError((error: Error) => this.handleError(error)));
    }

    private isApprovable(pullRequestResponse: PullRequestResponse): boolean {
        return pullRequestResponse.state === 'OPEN' && 
               this.approvableBranches.has(pullRequestResponse.destination.branch.name) &&
               pullRequestResponse.destination.repository.name === pullRequestResponse.source.repository.name;
    }

    private handleError(error: Error): Observable<boolean> {
        this.LOG.error(error.message, error.stack);
        return of(false);
    }
}
