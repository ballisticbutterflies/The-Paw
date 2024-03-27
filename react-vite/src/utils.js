export const stdTimeFormat = (military) => {
    if (military === "") return "Closed"

    let hrParts = parseInt(military.substring(0, 2));
    let hr = ((hrParts + 11) % 12) + 1;
    let min = military.substring(2);
    let amPm;

    if (hrParts > 11) amPm = 'PM'
    else amPm = 'AM'

    return `${hr}:${min} ${amPm}`
}
