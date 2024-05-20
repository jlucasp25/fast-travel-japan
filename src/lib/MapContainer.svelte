<script>
    import {LeafletMap, Polygon, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';
    import {cityStore} from "./stores.js";

    export let cities = {};

    const mapOptions = {
        center: [35.652832, 139.839478],
        zoom: 11,
    };
    const DEFAULT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const DEFAULT_TILE_LAYER_OPTIONS = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap contributors",
    };

    let shibuyaPolygon = [
        {lat: 35.664418, lng: 139.698567},
        {lat: 35.664940, lng: 139.707834},
        {lat: 35.660474, lng: 139.712246},
        {lat: 35.654496, lng: 139.711001},
        {lat: 35.650980, lng: 139.705410},
        {lat: 35.652154, lng: 139.696759},
        {lat: 35.658328, lng: 139.691645},
        {lat: 35.664418, lng: 139.698567}
    ].map(el => [el.lat, el.lng]);

    cityStore.subscribe((city) => {
        let selectedCity = cities[city];
        mapOptions['center'] = [selectedCity['lat'], selectedCity['lng']];
    });

</script>
<LeafletMap options={mapOptions}>
    <Polygon latLngs={shibuyaPolygon} color="#ff0000" fillColor="#ff0000">
        <Popup>Shibuya</Popup>
        <Tooltip>Shibuya</Tooltip>
    </Polygon>
    <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
</LeafletMap>
