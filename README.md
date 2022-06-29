# github-software-analytics-embedding
Seminar Project of the Seminar "Advanced Techniques for Analysis and Visualization of Software Data" of CGS, HPI and DEF in the Summer Term 2022

## Installation

Todo: Description of how to add the HiViSer action to a repository

## Development

Install `pnpm`:

```
npm i pnpm -g
```

To setup the Dashboard for development run:

```
cd webapp
pnpm i
pnpm run dev
```


### Git blobs gh api

gh api -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/matching-refs/notes/commits

gh api -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/commits/1ff88b0dc996214148b5b98669f52cd876ea9e4a

gh api --method POST -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/blobs -f content='My metrics blob' -f encoding='utf-8'

Get the blob
```
gh api -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/blobs/a7553cd0a3c0f65602eb761017063c01558b4b91
```


## Building and running the docker container locally
```
docker build -t analytics . && docker run -it analytics
```
