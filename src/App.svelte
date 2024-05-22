<script>
    import MapContainer from "./lib/MapContainer.svelte";
    import CityAreaController from "./lib/CityDistrictController.svelte";
    import POIList from "./lib/POIList.svelte";

    const availableMainCities = {
        'Osaka': {lat: 34.6937, lng: 135.5023},
        'Tokyo': {lat: 35.6895, lng: 139.6917},
        'Kyoto': {lat: 35.0116, lng: 135.7681},
    };

</script>
<aside class="h-screen w-[20vw] bg-gray-100">
    <CityAreaController/>
    <POIList/>
</aside>
<main class="h-screen w-[80vw] bg-amber-200">
    <MapContainer/>
</main>
