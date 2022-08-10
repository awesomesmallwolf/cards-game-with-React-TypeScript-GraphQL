# Uplift Interview

Welcome!

## Intro

This repository contains the Uplift coding challenge.
We believe in letting you work as freely as you want within the constraints of the project. Our goals are to assess:

- your ability to follow specs/requirement docs, making pragmatic decisions along the way
- your level of expertise (mid-level=good approach, expert level=teach us something we don't know)

## Table of Contents

1. [Evaluation criteria](#evaluation-criteria)
2. [General instructions](#general-instructions)
3. [Docker setup](#docker-setup)
4. [Using make](#using-make)
5. [Frontend challenge](#frontend-challenge)
6. [Backend challenge: Python](#backend-challenge-python)
7. [Backend challenge: NodeJS](#backend-challenge-nodejs)
8. [Backend challenge: PHP](#backend-challenge-php)
9. [Full Stack challenge: Python & React](#full-stack-challenge-python--react)
10. [License and sharing](#license-and-sharing)

## Evaluation criteria

- overall architecture and code quality (readability, decoupledness, etc)
- file structure
- naming (variables, files, etc)
- test coverage (see instructions for [running tests](#running-tests))
- proficiency at languages and libraries chosen for the task

If you wish to work full-stack, please attempt both frontend and backend in separate Pull Requests. Submit a PR first with your most comfortable or desired choice, so we can offer you feedback sooner.

## General instructions

- Please note there is a shared `.env` file for environment variables. This file is used by both the
  frontend and backend.
- Please lint and explain your code (even just briefly). CI runs checks, you can see them in `.github/workflows`
- After completing the challenge to a level that you're satisfied shows off your expertise,
  open a pull request against master (open two separate ones if you're doing frontend + backend)
- In your PR, add a description explaining your approach and anything else you think is worthwhile. Screenshots and demo videos are encouraged!
- The repo uses CI to lint and run tests on your PR. We'd like to see those passing.

## Docker setup

We think it's easier to complete the challenge using Docker. If you are familiar with Docker and already have it installed, you can skip to the specific challenge you are doing. Otherwise, below are some instructions on how to get Docker installed on your system.

<details>
<summary>Linux</summary>

1. Install

    ```console
    sudo apt-get update

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ```

2. Verify

    ```console
    sudo docker run hello-world
    ```
    This should pull the image, run the container, print the message and exit.

3. Add your user to the `docker` group

    ```console
    sudo groupadd docker

    sudo usermod -aG docker $USER

    newgrp docker 

    docker run hello-world # now the test should run without sudo
    ```

For more information, check the [Docker docs](https://docs.docker.com/engine/install/ubuntu/).


</details>

<details>
<summary>MacOS</summary>

1. Install Docker with [brew](https://brew.sh/)

    ```console
    brew install --cask docker
    brew install docker-compose
    ```

2. Verify

    ```console
    docker --version
    ```
    If this does not display the Docker version, you should restart the Docker deamon. You can find it using Spotlight or under the Applications folder.


For more information, check the [Docker docs](https://docs.docker.com/desktop/mac/install/) and [this guide](https://www.cprime.com/resources/blog/docker-for-mac-with-homebrew-a-step-by-step-tutorial/).

</details>

<details>
<summary>Windows</summary>

Docker offers an installer for Windows. Please check the [Docker docs](https://docs.docker.com/desktop/windows/install/) and, if you need additional information, [this guide from Microsoft](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers). Both guides use WSL 2.

</details>


## Using make

To make the development flow easier, we've added a Makefile with many useful targets. Check [this guide](https://makefiletutorial.com/) for more information on how to use `make`.

- To list all available commands, either check the file or run `make help`.
- If you want to pass additional arguments, for commands that allow this, you'll have to do the following: `make target-name ARGS='<any arguments>'`. For example, if you want to detach a container when running it, you'll have to do: `make python-start ARGS='--detach'`.

## Frontend challenge

Use React, TypeScript, and Tailwind.

Feel free to use any additional libraries, **except for out-of-the-box deck/card dealing.**

Please write tests.

The task is to build a simple card game. The designs are in Figma, you can see [desktop](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=0%3A1) and [mobile](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352) pages. The fonts should be available in Google Fonts, but we also included them in assets if they ever take them down (has happened before). It doesn't have to be pixel perfect, but it should look nice.

**Requirements**

1. Assuming a standard deck (52 cards of 4 suits: ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades).
2. Press a "Deal" button to deal 5 random cards.
3. Pressing the button again should deal 5 unique, random cards. Within the same game, you should never get the same cards again that you got in the past (just like a physical deck).
4. Add a card counter which shows how many cards are left.
5. Add an ace counter which shows how many aces are left. (this is not present in the designs at the time of this writing, you can do it the way it makes most sense to you, consistent with the designs)
6. Add a button to reset the game.
7. When all the aces have been dealt, "Game Over" should be displayed.
8. If there is an ace in the last draw and there are no more cards left to deal, display "Winner", otherwise display "You Lose. Better luck next time!" Last draw means the last draw that is allowed, as there could be additional cards left to deal, but no aces.

**Bonus!**

1. Animations. Wow us!
2. Sounds
3. Deploy to the web for us to play

### Designs

- [desktop](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352)

- [mobile](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352)

### Example implementations

Here are some demos, to paint a picture of submissions for candidates we've hired. You don't have to match these exactly.

- [Older demo, missing ace counter, with animations/confetti](https://drive.google.com/file/d/1uIYhG-74wrWs7YZx6Zz9Bdn3WSEtaIWY/view)
- [Newer demo, with ace counter](https://drive.google.com/file/d/1_nZ_v7LhZwystrVZ7MW8vWRHV6U5Qq9k/view)

### Troubleshooting & Tips

If you have any issues with husky/commit hooks, you may remove the \*.py section of "lint-staged" in package.json

Additionally, if you're on Windows, check out this tip for [yarn with husky on Windows](https://typicode.github.io/husky/#/?id=yarn-on-windows).

### Requirements

- Node 12+ (tested on 12.3.1)
- Yarn 1+ (tested on 1.16.0)

### Linting

CI runs prettier and eslint. Configuring your editor/IDE appropriately will make it easier for you to ensure passing CI tests when you submit.

### Getting Started with Docker

```console
make frontend-start
```

### Getting Started locally

```console
yarn install

# then

yarn start
```

Your browser will automatically open to http://localhost:3000 by Create React App. Changes should be reflected automatically.

See [CRA documentation](https://facebook.github.io/create-react-app/).

You are welcome to use [Next.js](https://nextjs.org/) instead, we just set up CRA for convenience.

## Backend challenge: Python

**TL;DR (but please, read on): backend version of the frontend card game.**
Use Django (v3+), graphene (v2), and a PostgreSQL database.

You should implement your own database architecture (models) and your own GraphQL schema.

There's no requirement to implement authentication. You can fake it at the middleware level, or log in to the Django admin and send subsequent requests with the session information set by Django. However, clean implementations of session/auth/login earn bonus points!

**Requirements**

1. Assuming a standard deck (52 cards of 4 suits: ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades).
2. GraphQL mutation to deal 5 unique, random cards (or fewer if there aren't 5 left).
   - Within the same game, you should never get the same cards again that you got in the past (just like a physical deck).
   - **Game is over when all Aces have been dealt.** If this happens in the final hand, the user Wins; otherwise, the user loses.
3. The GraphQL API should provide access to,
   - Remaining card count
   - Remaining Ace count
   - Game status
4. The GraphQL API should also provide a way to,
   - Start a new game
   - Deal a new hand
   - Reset the in-progress game
5. Display "Game Over" on completion. If the User wins, also display "Winner"; otherwise, display "You Lose. Better luck next time!"
6. Unit tests.

**Bonus!**

- Streak of wins/loses/games played in <period> (can be the last hour, but should be configurable)
- Storing user details, login/out
- Rig the game (e.g. player always wins)
- Custom deck support (e.g. other deck images, other lengths of decks, not just 52 cards)
- Authentication

Feel free to use any additional libraries, **except for out-of-the-box deck/card dealing.**

You can run a sample query at [localhost:8000/graphql/](http://localhost:8000/graphql/)

```graphql
query {
  me {
    username
    email
  }
}
```

### Getting started

There are two primary ways we suggest:

1. Docker (not tested on Windows, you're on your own)
2. Local development

### Getting Started with Docker

```console
make python-start
```

This will pull the containers, install everything needed and start the server on [localhost:8000](http://localhost:8000).

You can check other Docker related commands in the provided `Makefile` and `docker-compose.backend.yml`. See `docker/Docker.server/Dockerfile` for the Docker setup, and note that poetry is set up to export to `requirements.txt`.

### Getting Started locally

On MacOS, use [brew](https://brew.sh/) to manage installation of supporting programs, as it keeps things tidy.

On Windows, use WSL with Ubuntu 20.04 or later. You can also install pyenv (check out [pyenv-win](https://github.com/pyenv-win/pyenv-win)) and postgres natively. Docker is not officially supported.

For backend, the recommended way is to use poetry and pyenv. All of the commands in this section are from the `server` folder.

Install [poetry](https://python-poetry.org/). To manage python versions, we recommend installing [`pyenv`](https://github.com/pyenv/pyenv). See [the `poetry` documentation](https://python-poetry.org/docs/managing-environments/) for details.

Then install Python dependencies:

```console
cd server/

# try one of these

pyenv install 3.9.9  # or pyenv local 3.9.9
poetry env use ~/.pyenv/versions/3.9.9/bin/python
poetry install
# or
poetry install --python `which python3`
```

If you don't have it already, you'll also want to install Postgres. Version 10 or later should be fine.

If you have issues:

- Check which pyenv version homebrew installs https://github.com/Homebrew/homebrew-core/blob/master/Formula/pyenv.rb#L4
- See what versions of python that pyenv version supports: https://github.com/pyenv/pyenv/tree/master/plugins/python-build/share/python-build
- On MacOS using M1 chip, `poetry install` may fail with an error for `pyscopg2-binary` (`ld: library not found for -lssl`). Check out [this article](https://rogulski.it/blog/install-psycopg2-on-apple-m1/) to install psycopg2.

Copy example env vars to `.env`. You might need to change `DATABASE_URL` based on your environment.

```console
cp ../.env.example ../.env
```

Create the `uplifty` database:

```console
createdb uplifty
```

Load the sample user data:

```console
poetry run ./manage.py migrate
poetry run ./manage.py loaddata uplifty/fixtures/users.json
poetry run ./manage.py runserver
```

Now you can go to http://localhost:8000, http://localhost:8000/graphql/, or http://localhost:8000/admin/ for the Django admin.

Log in to the admin with the [sample test user](#sample-test-user) from below and try the sample query from the challenge.

### Linting

CI runs black, isort, flake8. Configuring your editor/IDE appropriately will make it easier for you to ensure passing CI tests when you submit.


### Installing packages

    poetry add <package name>  # this automatically adds it to pyproject.toml and poetry.lock

If you manually update `pyproject.toml`, make sure you run `poetry update` to update the lockfile.

If you run with docker, and your package is suddenly missing, you may need to rebuild the images using:

```console
make python-build
```

### Running tests

Please run the tests, and lint your backend code. This helps us review code, as it's already consistent with this project.

```console
make python-lint
make python-test
```

Or check out the `Makefile` for other options.

### Server architecture

- PostgreSQL 10+
- Python 3.9+
- Django 3
- [django-environ](https://github.com/joke2k/django-environ) for easy environment configuration via `.env` files

### Sample test user

The database is created with a sample test user:

| Name     | Value                   |
| -------- | ----------------------- |
| Username | interview               |
| Email    | interview@uplift.agency |
| Password | uplifty                 |

You can change these in the Django admin if you wish.


## Backend challenge: NodeJS

If you are working with node instead of Django, we'd like you to do the same backend challenge with TypeScript and GraphQL.

There is a starter server you can use in `node-server/`, and it runs CI using `.github/workflows/backend_node.yml`. Please make sure the build passes.

## Backend challenge: PHP

If you are working with PHP instead of Django, we'd like you to do the same backend challenge with Laravel and GraphQL.

There is a starter server you can use in `php-server/`; please see the [README](php-server/README.md) in that directory.

It runs CI using `.github/workflows/backend_php.yml`. Please make sure the build passes.


## Full Stack challenge: Python & React

We're happy to see you want to do both. Please check the [frontend](#frontend-challenge) and [backend](#backend-challenge-python) sections for instructions on the logic. If you prefer to work locally, also check the instructions on how to get each component running.

### Getting Started with Docker 

```console
make fullstack-python-start
```

Also, you'll need to set up the Apollo client for the API:
1. [Here](https://www.apollographql.com/docs/react/get-started/) you can find resources on how to setup Apollo. If you install packages locally, make sure to also `make fullstack-python-build` after you finish the setup to have everything working in Docker. Otherwise, if you have the containers running, you can `make frontend-bash` and `npm install` / `yarn add` any package there.

2. [Here](https://www.graphql-code-generator.com/docs/getting-started/installation) you can find resources on GraphQL code generation.

3. Run `make python-schema` to update `schema.json` on the backend.

4. Uncomment the server volume in `docker-compose.frontend.yml`. You need this so that `../server/schema.json` is visible in the frontend container.

5. Create `frontend/codegen.yml` and add the following:

    ```yml
    overwrite: true
    schema: '../server/schema.json'
    documents: null
    generates:
      ./src/generated/graphql-types.ts:
        plugins:
        - 'typescript'
        - 'typescript-operations'
        - 'typescript-react-apollo'
    ```

5. Add `"gql-codegen": "graphql-codegen --config codegen.yml"` in `frontend/package.json` and run it.
    ```console
    make frontend-bash
    yarn gql-codegen
    ```
    
    If you see the following the configuration was successful:
    ```
    ✔ Parse configuration
    ✔ Generate outputs
    Done in 2.45s.
    ```


## License and sharing

This code is intended to be private. You are not allowed to share any of the base template code without Uplift's express permission. Please reach out to us **before** you share any of the code in this repository with others.

That said, we understand you may want to show others your work. If you're proud of your work on this exercise and want to share it with future companies or add to your portfolio, we kindly request you help us keep the codebase as private as possible. If it's easy for other candidates to find a good coding exercise submission, they will, and then we have to invest a bunch of time to change the requirements so that old examples cannot be used. Unfortunately we've had cases of applicants copying examples they found.

Here are some ideas to share this more privately. We would really appreciate if you followed them:

- Host the code privately and only give access to others upon request. This is the best way to ensure it's not easy to find.

- Share only a few of the files, but not enough to tie everything together.

- Host it on your own server, or bitbucket instead of github.
