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
pnpm i
pnpm run dev
```

Building and running the docker container locally
```
docker run --rm -it $(docker build -q .)
```