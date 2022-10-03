# github-software-analytics-embedding
Seminar Project of the Seminar "Advanced Techniques for Analysis and Visualization of Software Data" of CGS, HPI and DEF in the Summer Term 2022

# Usage
Create a new GitHub Actions workflow in your project, e.g. at `.github/workflows/analytics-embedding.yml`. The content of the file should be in the following format:
```yaml
name: Analytics Treemap Embedding

on:
  # Trigger the workflow on push or pull request,
  # but only for the main branch
  push:
    branches:
      - main
      
  pull_request:
    branches:
      - main

jobs:
  analytics-embedding:
    name: Run Analytics Treemap Embedding 🔎
    runs-on: ubuntu-latest

    steps:
      - name: Check out Git repository
        uses: actions/checkout@v3

      - name: Run Hiviser Action
        uses: hpicgs/hiviser-action@v0
        with:
          # Optional, use if you want to analyse a specific folder
          repository_path: ./
          # Optional to enable benchmarking
          benchmark: true
```

## Development

Install `pnpm`:

```
npm i pnpm -g
```

### Setup Frontend Development
To setup the Frontend for development run:

```
cd frontend
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
This repo uses the github git database API to store commit based software analytics data on a custom ref directly in the repository. This means the meta data will not be cloned if you run git pull normally.

## Building and running the docker container locally
```
docker build -t analytics . && docker run -it analytics
```
