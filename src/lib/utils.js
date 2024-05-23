/**
 * Converts a standard polygon object to a latlng array
 * A polygon object is an array of objects with lat and lng properties.
 * A latlng array is an array of arrays with lat and lng values.
 */
export const convertPolygonObjectToLatLng = (poly) => {
    return poly.map((p) => [p.lat, p.lng]);
}

export const convertPointObjectToLatLng = (point) => {
    return [point.lat, point.lng];
}

/**
 * Useful for sorting points by latitude and longitude
 * @param points
 * @returns {*}
 */
export const sortPointsByLatLng = (points) => {
    points.sort((a, b) => {
        if (a.lat === b.lat) {
            return a.lng - b.lng;
        }
        return a.lat - b.lat;
    });
    return points;
}