<script>
    import {LeafletMap, Polygon, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';
    import {cityDistrictStore} from "./stores.js";
    import {convertPolygonObjectToLatLng} from "./utils.js";
    import L from 'leaflet';

    let mapAdapter;
    let cityDistrictConfiguration = null;
    let currentCity = null;

    const mapOptions = {
        center: [35.652832, 139.839478],
        zoom: 11,
    };
    const DEFAULT_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const DEFAULT_TILE_LAYER_OPTIONS = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap / João Lucas Pires",
    };

    cityDistrictStore.subscribe((cityDistrict) => {
        cityDistrictConfiguration = cityDistrict;
        if (cityDistrictConfiguration.city) {
            console.log("should fly")
            flyToCity(cityDistrictConfiguration.city);
        }
    });

    const flyToCity = (city) => {
        let poly = L.latLngBounds(convertPolygonObjectToLatLng(city.polygon))
        mapAdapter.getMap().fitBounds(poly);
    }

</script>
<LeafletMap options={mapOptions} bind:this={mapAdapter}>
    <!-- City Poly -->
    {#if cityDistrictConfiguration.city && cityDistrictConfiguration.enableCityPoly}
        <Polygon latLngs={convertPolygonObjectToLatLng(cityDistrictConfiguration.city.polygon)} color="green"
                 fillColor="green">
            <Tooltip>{cityDistrictConfiguration.city.name}</Tooltip>
        </Polygon>
    {/if}
    <!-- District Poly -->
    {#if cityDistrictConfiguration.district && cityDistrictConfiguration.enableDistrictPoly}
        <Polygon latLngs={convertPolygonObjectToLatLng(cityDistrictConfiguration.district.polygon)} color="red"
                 fillColor="red">
            <Tooltip>{cityDistrictConfiguration.district.name}</Tooltip>
        </Polygon>
    {/if}
    <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
</LeafletMap>
