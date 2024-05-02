# Word Guessing Game: PHWIRDLE

## Overview

This project is a word guessing game where the player tries to guess a randomly generated word of five letters. The game provides visual feedback for correct and existing letters in the guessed word.

## Features

- **Dynamic Keyboard**: Users can input guesses using both a physical keyboard and an on-screen virtual keyboard.
- **Visual Feedback**: Correctly guessed letters are highlighted with the "correct" class, and existing but incorrectly placed letters are highlighted with the "existing" class.
- **Game Over**: The game ends when the correct word is guessed or when the maximum number of attempts is reached.

## Drawbacks

Unfortunately, I was unable to implement a spellchecking system, there are free dictionnary API available, but the implementation would require more state management than vanilla javascript allows.
For the time being, users are indeed able to input gibberish as a word guess, but since it defeats the point of the game and is detrimental to the enjoyment, 
I think the incentives are in favour of playing the game in earnest.

## Getting Started
### Prerequisites

- Modern web browser
- Internet connection

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/word-guessing-game.git
```
Open the `index.html` file in your web browser.

## Usage
Upon loading the game, a word of the day (WOTD) is generated and displayed at the top of the screen.
Use the virtual keyboard or your physical keyboard to input guesses.
Clicking on a letter key or typing on your physical keyboard will add that letter to the current guess.
Press "Enter" to submit your guess.
Correctly guessed letters will be highlighted with the "correct" class, and existing but misplaced letters will be highlighted with the "existing" class.
The game ends when the correct word is guessed or when the maximum number of attempts is reached.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

Fork the repository.
- Create your feature branch (git checkout -b feature/YourFeature).
- Commit your changes (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/YourFeature).
- Create a new Pull Request.
- 
## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
Special thanks to Random Word API for providing the word generation functionality.
