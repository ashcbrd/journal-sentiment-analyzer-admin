function decimalToPercentage(decimal: number): number {
    // Multiply the decimal by 100 to get the percentage
    const percentage = decimal * 100;
    // Round the percentage to the nearest integer
    return Math.round(percentage);
}

// Test the function with 0.001
const percentage = decimalToPercentage(0.001);
console.log(percentage); // Output: 0
