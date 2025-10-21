#include <iostream>
#include <cstdlib>
#include <ctime>
#include <string>

using namespace std;

// Function prototypes
bool login();
void showMenu();
void guessTheNumber();
void multiplicationQuiz();
void rockPaperScissors();

int main() {
    srand(static_cast<unsigned int>(time(0)));
    if (!login()) {
        cout << "Account locked. Too many failed attempts.\n";
        return 0;
    }

    showMenu();
    cout << "Thank you for playing! Goodbye.\n";
    return 0;
}

bool login() {
    const string USERNAME = "player";
    const string PASSWORD = "arcade123";
    string inputUser, inputPass;
    int attempts = 0;
    do {
        cout << "Login (" << (3 - attempts) << " attempts left)\n";
        cout << "Username: ";
        cin >> inputUser;
        cout << "Password: ";
        cin >> inputPass;
        if (inputUser == USERNAME && inputPass == PASSWORD) {
            cout << "Login successful!\n";
            return true;
        } else {
            cout << "Incorrect username or password.\n";
            attempts++;
        }
    } while (attempts < 3);
    return false;
}

void showMenu() {
    int choice;
    bool running = true;
    while (running) {
        cout << "\n=== Game Hub Menu ===\n";
        cout << "1. Guess the Number 🎲\n";
        cout << "2. Multiplication Quiz ✖️\n";
        cout << "3. Rock, Paper, Scissors ✊✋✌️\n";
        cout << "4. Exit\n";
        cout << "Select a game (1-4): ";
        cin >> choice;
        switch (choice) {
            case 1:
                guessTheNumber();
                break;
            case 2:
                multiplicationQuiz();
                break;
            case 3:
                rockPaperScissors();
                break;
            case 4:
                running = false;
                break;
            default:
                cout << "Invalid choice. Please try again.\n";
        }
    }
}

void guessTheNumber() {
    int number = rand() % 100 + 1;
    int guess;
    cout << "\n--- Guess the Number 🎲 ---\n";
    cout << "I'm thinking of a number between 1 and 100.\n";
    while (true) {
        cout << "Enter your guess: ";
        cin >> guess;
        if (guess == number) {
            cout << "Correct! You guessed the number!\n";
            break;
        } else if (guess < number) {
            cout << "Too low. Try again.\n";
        } else {
            cout << "Too high. Try again.\n";
        }
    }
}

void multiplicationQuiz() {
    int score = 0;
    cout << "\n--- Multiplication Quiz ✖️ ---\n";
    for (int i = 1; i <= 5; ++i) {
        int a = rand() % 12 + 1;
        int b = rand() % 12 + 1;
        int answer;
        cout << "Q" << i << ": " << a << " x " << b << " = ";
        cin >> answer;
        if (answer == a * b) {
            cout << "Correct!\n";
            score++;
        } else {
            cout << "Incorrect. The answer is " << (a * b) << ".\n";
        }
    }
    cout << "You got " << score << " out of 5 correct.\n";
}

void rockPaperScissors() {
    string options[3] = {"Rock", "Paper", "Scissors"};
    int userChoice, compChoice;
    char playAgain;
    cout << "\n--- Rock, Paper, Scissors ✊✋✌️ ---\n";
    do {
        cout << "Choose: 1. Rock  2. Paper  3. Scissors\n";
        cout << "Your choice: ";
        cin >> userChoice;
        compChoice = rand() % 3 + 1;
        cout << "Computer chose: " << options[compChoice - 1] << endl;
        if (userChoice == compChoice) {
            cout << "It's a tie!\n";
        } else if ((userChoice == 1 && compChoice == 3) ||
                   (userChoice == 2 && compChoice == 1) ||
                   (userChoice == 3 && compChoice == 2)) {
            cout << "You win!\n";
        } else if (userChoice >= 1 && userChoice <= 3) {
            cout << "You lose!\n";
        } else {
            cout << "Invalid choice.\n";
        }
        cout << "Play again? (y/n): ";
        cin >> playAgain;
    } while (playAgain == 'y' || playAgain == 'Y');
}