declare module 'webhooks' {
    interface TPusher {
        name: string,
        email: string
    }

    interface TOwner {
        login: string,
        id: number,
        avatar_url: string
    }

    interface TCommit {
        id: string,
        tree_id: string,
        distinct: boolean,
        message: string,
        timestamp: string,
        url: string,
        author: {
            name: string,
            email: string,
            username: string
        },
        committer:{
            name: string,
            email: string,
            username: string
        },
        added: Array<string>,
        removed: Array<string>,
        modified: Array<string>
    }
    
    interface TPayload {
        ref: string,
        after: string,
        repository:{
            id: number,
            name: string,
            full_name: string,
            owner: TOwner & TPusher,
            description: string,
            url: string,
            created_at: number,
            updated_at: string,
            pushed_at: number,
            git_url: string,
        },
        pusher: TPusher,
        sender: TOwner,
        created: boolean,
        deleted: boolean,
        forced: boolean,
        base_ref: string | null,
        compare: string,
        commits: Array<TCommit>,
        head_commit: TCommit
    }

    interface DBNamespace {
        hookid: string,
        handler: string
    }
}
