import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PullRequestResponse } from './dto/pull-request-response';
import { PullRequest } from './pull-request';

@Injectable()
export class BitbucketClientService {

    private readonly baseUrl = 'https://api.bitbucket.org';
    private readonly workspace = process.env.BITBUCKET_WORKSPACE;

    constructor(private readonly httpService: HttpService) { }

    public getPullRequest(pullRequest: PullRequest): Observable<PullRequestResponse> {
        return this.httpService.get<PullRequestResponse>(`${this.baseUrl}/2.0/repositories/${this.workspace}/${pullRequest.repository}/pullrequests/${pullRequest.id}`)
                               .pipe(map((response: AxiosResponse<PullRequestResponse>) => response.data));
    }

    public approvePullRequest(pullRequest: PullRequest): Observable<boolean> {
        return this.httpService.post<void>(`${this.baseUrl}/2.0/repositories/${this.workspace}/${pullRequest.repository}/pullrequests/${pullRequest.id}/approve`)
                               .pipe(map(_ => true));
    }
}
