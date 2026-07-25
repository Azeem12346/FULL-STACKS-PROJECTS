#include <iostream>
#include <cmath> 
using namespace std;

int main() {
    int number, originalNumber, digit1, digit2, digit3, sum;

    cout << "Enter a 3-digit number: ";
    cin >> number;

    
    if (number < 100 || number > 999) {
        cout << "Invalid input! Please enter a 3-digit number." << endl;
        return 0;
    }

    originalNumber = number;

    
    digit3 = number % 10;      
    number = number / 10;
    digit2 = number % 10;       
    number = number / 10;
    digit1 = number;            

    
    sum = pow(digit1, 3) + pow(digit2, 3) + pow(digit3, 3);

    
    if (sum == originalNumber) {
        cout << originalNumber << " is an Armstrong number." << endl;
    } else {
        cout << originalNumber << " is not an Armstrong number." << endl;
    }

    return 0;
}
