# Poker Peak

** A web3 based Poker game!!**
# Poker of Hands

## Description
We implementing the Poker of hands.
### Game Implementation

The game is implemented using a pseudo-state machine architecture on a smart contract. In this pseudo-state machine, the game transitions between different states, each opening up possibilities for specific functions to be called. This architecture ensures a structured and dynamic gameplay experience.

### State Emission

What sets this game apart is its continuous state emission. On each state change, the game emits its current state. These emitted states are observed by a server, allowing real-time updates. This crucial information is then seamlessly presented to all connected users, creating an immersive and synchronized gaming environment.

### Transaction-based Gameplay

The game loop kicks off when server initiates a transaction to the smart contract. This transaction triggers a series of events ( generating random number,shuffeling the deck, emmiting the shuffeled deck(encrypted)): the state change is emitted, observed by the server, and relayed to all connected players. The loop continues as users interact with the game, making transactions that, in turn, update the game's state and keep the server and players in sync.

The seamless flow of transactions, state emissions, and server updates continues until the game reaches its completion.

## Image refrences

Project update images!.

![Demo Image 1](https://github.com/priyanshu-7938/ENCODE_lightlink/blob/master/icons8-tick-50.png?raw=true)
![Demo Image 2](https://github.com/priyanshu-7938/ENCODE_lightlink/blob/master/image.png?raw=true)

## Architecture

The artitecture if a bit slow , to maintain the Possestion of funds to user itself, and along with the immutability using contract,and eventually the waiting time does indeed gets large ,well thats mke the game more intresting( keeping the players on the edgs!!)
This Problem can be eassiely cleared by using a high throttle chains, intended for gaming!.
![The basic working artitecture!](https://github.com/priyanshu-7938/ENCODE_lightlink/blob/master/WhatsApp%20Image%202024-01-20%20at%2013.28.36_4c138b1a.jpg?raw=true)

## Card Creation Process (Poker Hands Game)

For a fair gameplay. we developed a precise mechnism to genrate and maintainn the generated deck on chainn it self, Here's a concise overview:

### 1. Deck Shuffling

At the game's inception, a shuffled deck is randomly generated, establishing the foundation for a dynamic and unpredictable card distribution.

### 2. Key Generation

A set of private and public keys is generated to facilitate secure encryption and decryption processes.

### 3. Card Encryption

The generated deck is encrypted using the public key, ensuring that card details remain confidential until revealed during gameplay.

### 4. Posting to Contract

The encrypted cards are posted to the smart contract, initiating the decentralized gameplay process.

### 5. On-chain Reshuffling

Using a generated random number and Affine cryptic mapping, the cards are reshuffled on-chain, introducing a layer of randomness that is Quantum and "can't be pridicted".

### 6. Card Emission

The reshuffled cards are emitted, and their states are observed on the server. These emitted cards are later decrypted and forwarded to respective users.



## Features

- _Feature 1: Allows ownership of assets of user to them self by, allowing payment of required bets /and call during the game itself.
- _Feature 2: Immutability : by recording and emmiting the state changes on every stage of game (checkout the Contracts/contract/PokerRoom.sol for emits.)
- _Feature 3: the generated deck it totally unpredictable and the game is fair ,given that the server maintains the private key and keeps it a secret.

## Progress Till Now
  the game (mechanism/ psuedo state machine)contract is completed and working😝! Checkout the deployed demo contract on address 0x10c31BCdefeb74D481681358CCF6EDCca687e6A2 : lightlink pegesis testnet.
  The fronntend is under development
  And same for the server fro the game.

