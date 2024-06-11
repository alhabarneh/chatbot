/**
 * Check the pattern to ensure it is in the format YYYY-MM-DD
 * 
 * @param {string} input 
 * @returns boolean
 */
function isValidDate(input) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!input.match(regex)) {
        return false;
    }

    // Parse the date parts to integers
    const parts = input.split("-");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    // Check the ranges of month and day
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    // Create a new date object
    const date = new Date(input);
    if (isNaN(date.getTime())) {
        return false; // Invalid date
    }

    // Check if the date object matches the input values
    if (date.getUTCFullYear() !== year || (date.getUTCMonth() + 1) !== month || date.getUTCDate() !== day) {
        return false;
    }

    const currentDate = new Date();

    return date >= currentDate;
}

/**
 * Check the pattern to ensure it is in the format HH:MM
 * 
 * @param {string} timeString 
 * @returns boolean
 */
function isValidTime(timeString) {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(timeString);
}

/**
 * Checks if the time is in the future.
 * 
 * @param {string} timeString 
 * @returns boolean
 */
function isFutureTime(timeString) {
    // Get the current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Parse the time parts to integers
    const parts = timeString.split(":");
    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);

    // Compare with the current time
    return hour > currentHour || (hour === currentHour && minute > currentMinute);
}

/**
 * This function would make it easier to use a different logging mechanism in the future.
 * 
 * @param {string} message 
 */
function log(message) {
    console.log(message);
}

module.exports = {
    isValidDate,
    isValidTime,
    isFutureTime,
    log,
};