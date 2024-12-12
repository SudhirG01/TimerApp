
export const formatTime = (totalSeconds) => {
    const hour = Math.floor(totalSeconds / 3600); // Calculate hours
    totalSeconds = totalSeconds % 3600; // Remaining seconds after hours
    const minute = Math.floor(totalSeconds / 60); // Calculate minutes
    totalSeconds = totalSeconds % 60 // Remaining seconds after minutes
    const second = totalSeconds
    return {
        hour: hour.toString().padStart(2, "0"),
        minute: minute.toString().padStart(2, "0"),
        second: second.toString().padStart(2, "0")
    }
}

export const calculateTime = (hours, minutes, seconds) => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    return totalSeconds;
}

