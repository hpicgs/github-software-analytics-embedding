# github-software-analytics-embedding
Seminar Project of the Seminar "Advanced Techniques for Analysis and Visualization of Software Data" of CGS, HPI and DEF in the Summer Term 2022

![image](https://user-images.githubusercontent.com/33397387/194839012-0c3efa5c-29cf-41b3-a686-1e9fd310c1a2.png)
This repo contains a dockerized github action to calculate typescript software metrics per commit and store them as a `.csv` file directly to the git repository under the custom ref `refs/metrics`.
It also provides a React Frontend to visualize the calculated metrics in a treemap.
The viewer can also be embedded into an existing webpage.

Please note that this is a research prototype and not meant for use in production as of now.

# Integration into your Github project
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

      - name: Run Analytics Treemap Embedding Action 🚀
        uses: hpicgs/github-software-analytics-embedding@v0
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

Navigate to `localhost:3000` in the browser of your choice.

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
