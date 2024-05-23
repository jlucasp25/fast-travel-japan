<script>
    import {LeafletMap, Marker, Polygon, Popup, TileLayer, Tooltip} from 'svelte-leafletjs';
    import {cityDistrictStore, POIStore} from "./stores.js";
    import {convertPointObjectToLatLng, convertPolygonObjectToLatLng, sortPointsByLatLng} from "./utils.js";
    import L from 'leaflet';

    let mapAdapter;
    let cityDistrictConfiguration = null;
    let activePoints = [];
    let enableSelectedPointsPoly = false;
    let selectedPointsPoly = null;


    const mapOptions = {
        center: [35.652832, 139.839478],
        zoom: 11,
    };
    const DEFAULT_TILE_URL = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png";
    const DEFAULT_TILE_LAYER_OPTIONS = {
        minZoom: 0,
        maxZoom: 20,
        maxNativeZoom: 19,
        attribution: "© OpenStreetMap / João Lucas Pires",
    };

    cityDistrictStore.subscribe((cityDistrict) => {
        cityDistrictConfiguration = cityDistrict;
        if (cityDistrictConfiguration.city) {
            flyToCity(cityDistrictConfiguration.city);
        }
    });

    const flyToCity = (city) => {
        let poly = L.latLngBounds(convertPolygonObjectToLatLng(city.polygon))
        mapAdapter.getMap().fitBounds(poly);
    }

    POIStore.subscribe((points) => {
        activePoints = points;
        if (enableSelectedPointsPoly) {
            generateSelectedPointsPoly();
        }
    });

    const generateSelectedPointsPoly = () => {
        if (!cityDistrictConfiguration.city) {
            alert("Please select a city first!");
            return;
        }
        if (activePoints.length === 0) {
            alert("Please select some points first!");
            return;
        }
        selectedPointsPoly = sortPointsByLatLng(activePoints.map(point => point.location))
        enableSelectedPointsPoly = true;
    }

</script>
<button class="btn btn-warning absolute top-0 right-0 mr-5 mt-5 z-[999]" on:click={generateSelectedPointsPoly}>Points
    Poly
</button>
<LeafletMap options={mapOptions} bind:this={mapAdapter}>
    {#each activePoints as point}
        <Marker latLng={convertPointObjectToLatLng(point.location)}>
            <Popup>
                <p>{point.name}</p>
            </Popup>
        </Marker>
    {/each}
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
    <!-- Points Poly -->
    {#if enableSelectedPointsPoly && selectedPointsPoly}
        <Polygon latLngs={convertPolygonObjectToLatLng(selectedPointsPoly)} color="blue"
                 fillColor="blue">
        </Polygon>
    {/if}
    <TileLayer url={DEFAULT_TILE_URL} options={DEFAULT_TILE_LAYER_OPTIONS}/>
</LeafletMap>
