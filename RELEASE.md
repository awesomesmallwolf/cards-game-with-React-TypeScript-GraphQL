# Deck Dragon

Welcome!

## Intro

This is simple card game for luck and fun.
We believe in letting you work with fun and freetime within this game. Don't be addicted to it as you are with your work. 😉

## Table of Contents

1. [Requirements](#requirements)
2. [How to run](#how-to-run)
3. [How to play](#how-to-play)
4. [What's more](#what-is-more)
5. [Rig](#rig)
6. [Used technics](#used-technics)
7. [License and sharing](#license-and-sharing)


## Requirements

- Node 12+ (tested on 12.3.1)
- Yarn 1+ (tested on 1.16.0)

## How to run

### Getting started

There are two primary ways we suggest:

1. Docker (not tested on Windows, you're on your own)
2. Local running

### Docker setup

We think it's easier to run using Docker. If you are familiar with Docker and already have it installed, you can skip to the next step. Otherwise, below are some instructions on how to get Docker installed on your system.

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

### Local

```console
yarn install

# then

yarn start
```

Your browser will automatically open to http://localhost:3000 by Create React App. Changes should be reflected automatically.

See [CRA documentation](https://facebook.github.io/create-react-app/).

## How to play

1. Assuming a standard deck (52 cards of 4 suits: ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades).
2. Press a "Deal" button to deal 5 random cards.
3. Pressing the button again should deal 5 unique, random cards. Within the same game, you should never get the same cards again that you got in the past (just like a physical deck).
4. Card counter shows how many cards are left.
5. Ace counter shows how many aces are left.
6. There is a button to reset the game.
7. When all the aces have been dealt, "Game Over" will be displayed.
8. If there is an ace in the last draw and there are no more cards left to deal, you are "Winner", otherwise "You Lose. Better luck next time!" Last draw means the last draw that is allowed, as there could be additional cards left to deal, but no aces.

## Quality

- Overall architecture and code quality (readability, decoupledness, etc)
- File structure
- Naming (variables, files, etc)
- Cute animations. Wow!
- Fully customizable (e.g. other deck images, other lengths of decks, not just 52 cards)
- Test coverage (see instructions for [running tests](#running-tests))

## Rig

If you are interested in rigging, contact us. 💌

## Used technics

Used Node, Apollo, Prisam, Redis, GraphQL Code Generator, React, TypeScript, and Tailwind.

## License and sharing

This code is intended to be private. You are not allowed to share any of the base template code without Dragon's express permission. Please reach out to us **before** you share any of the code in this repository with others.
