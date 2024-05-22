/**
 * Converts a standard polygon object to a latlng array
 * A polygon object is an array of objects with lat and lng properties.
 * A latlng array is an array of arrays with lat and lng values.
 */
export const convertPolygonObjectToLatLng = (poly) => {
    return poly.map((p) => [p.lat, p.lng]);
}