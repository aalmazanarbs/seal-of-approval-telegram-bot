export interface PullRequestResponse {
    destination: Destination;
    source: Source;
    state: string;
}

interface Source {
    repository: Repository;
}

interface Destination {
    repository: Repository;
    branch: Branch;
}

interface Repository {
    name: string;
}

interface Branch {
    name: string;
}
