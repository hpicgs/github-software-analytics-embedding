import React from 'react'
import { useParams } from 'react-router-dom';
import Repo from './Repo';

export default function RepoPage() {
    const { owner, repo } = useParams();

    if (owner && repo) {
        return <Repo owner={owner} repo={repo} />
    } else {
        return (<div>
            <h1 className="title">Oops.</h1>
            <h2 className="subtitle">Repository not found</h2>
        </div>)
    }
}
