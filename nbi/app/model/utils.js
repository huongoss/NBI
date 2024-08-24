/**
 * https://www.fhwa.dot.gov/bridge/mtguide.pdf
 * https://www.arcgis.com/apps/mapviewer/index.html?layers=bd1b6ee967134ea68fac351cef461b5e

 * LAT (XX degrees XX minutes XX.XX seconds) 8 digits
 * LONG (XXX degrees XX minutes XX.XX seconds) 9 digits
 * Converts DDDMMSS format to radians
 * @param dms - DDDMMSS format string (e.g., "39440820" for latitude)
 * @returns Radians value
 */
export function LatDMSToDegree(dms) {
    // Check if the DMS string is valid
    if (!dms) {
        return -1;
    }

    // Extract degrees, minutes, and seconds from the DDDMMSS string
    let i = 0;
    const degrees = parseInt(dms.slice(i, i += 2));
    const minutes = parseInt(dms.slice(i, i += 2));
    const seconds = parseFloat(parseInt(dms.slice(i, i += 2)) + '.' + parseInt(dms.slice(i)));

    // Convert DMS to decimal degrees
    const decimalDegrees = degrees + (minutes / 60.0) + (seconds / 3600.0);

    // Convert decimal degrees to radians
    return decimalDegrees;
}
export function LonDMSToDegree(dms) {
    // Check if the DMS string is valid
    if (!dms) {
        return -1;
    }

    // Extract degrees, minutes, and seconds from the DDDMMSS string
    let sign = 1;
    if (dms[0] == '0') sign = -1;;

    let i = 1;
    const degrees = parseInt(dms.slice(i, i += 2));
    const minutes = parseInt(dms.slice(i, i += 2));
    const seconds = parseFloat(parseInt(dms.slice(i, i += 2)) + '.' + parseInt(dms.slice(i)));

    // Convert DMS to decimal degrees
    const decimalDegrees = degrees + (minutes / 60.0) + (seconds / 3600.0);

    // Convert decimal degrees to radians
    return sign * decimalDegrees;
}