

import LocationModel from "./LocationModel";

export async function locationHandler(req: any, res: any) {
    // Query the database for bridge locations
    // Check if specific strurture is requested
    if (req.query.STRUCTURE_NUMBER_008) {
        const locations = await LocationModel.find({ STRUCTURE_NUMBER_008: req.query.STRUCTURE_NUMBER_008 });
        res.json(locationAdapter(locations));
    }
    else {
        const locations = await LocationModel.find();
        res.json(locationAdapter(locations));
    }
}

function locationAdapter(locations: any) {
    const bridges = [];
    for (const location of locations) {
        // Extract the latitude and longitude fields from the location
        const latitude = location.LAT_016;
        const longitude = location.LONG_017;
        const bridge = {
            latitude,
            longitude
        };
        bridges.push(bridge);
    }
    return bridges;
}