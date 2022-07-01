# github-software-analytics-embedding
Seminar Project of the Seminar "Advanced Techniques for Analysis and Visualization of Software Data" of CGS, HPI and DEF in the Summer Term 2022

# Usage
⚠ This will not work until we made our first release

Create a new GitHub Actions workflow in your project, e.g. at .github/workflows/hiviser.yml. The content of the file should be in the following format:
```yaml
name: HiViSer

on:
  # Trigger the workflow on push or pull request,
  # but only for the main branch
  push:
    branches:
      - main
  # Replace pull_request with pull_request_target if you
  # plan to use this action with forks, see the Limitations section
  pull_request:
    branches:
      - main

jobs:
  run-hiviser:
    name: Run HiViSer
    runs-on: ubuntu-latest

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Run linters
        uses: hpicgs/hiviser-action@v0
        # Optional, use if you want to analyse a specific folder
        with:
          repository_path: ./
```

## Development

Install `pnpm`:

```
npm i pnpm -g
```

### Setup Webapp Development
To setup the Webapp for development run:

```
cd webapp
pnpm i
pnpm run dev
```

Navigate to e.g. `localhost:3000/hpicgs/github-software-analytics-embedding/5b337b8409f2a2d3b1b14f85d52a97a0258fe256`
### Setup Code Anayltics Development locally
Create an .env file
```
cd analytics
cp .env.example .env
```
Make shure you fill in the GITHUB_TOKEN variable in the `.env` file

To setup the node application for code analysis for development run:
```
cd analytics
pnpm i
pnpm start
```

### Git blobs gh api

gh api -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/matching-refs/notes/commits

gh api -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/commits/1ff88b0dc996214148b5b98669f52cd876ea9e4a

gh api --method POST -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/blobs -f content='My metrics blob' -f encoding='utf-8'

Get the blob
```
gh api -H "Accept: application/vnd.github.v3+json" /repos/hpicgs/github-software-analytics-embedding/git/blobs/a7553cd0a3c0f65602eb761017063c01558b4b91
```

#### Curl
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/hpicgs/github-software-analytics-embedding/git/blobs/a7553cd0a3c0f65602eb761017063c01558b4b91

curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/hpicgs/github-software-analytics-embedding/git/blobs/a7553cd0a3c0f65602eb761017063c01558b4b91 | jq -r '.content' | base64 --decode

## Building and running the docker container locally
```
docker build -t analytics . && docker run -it analytics
```
