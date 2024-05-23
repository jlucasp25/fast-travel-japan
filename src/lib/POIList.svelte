<script>
    import {onMount} from "svelte";
    import {POIStore, cityDistrictStore, activeRouteStore} from "./stores.js";
    import {DIRECTIONS_KEY} from "./keys.js";

    const baseURL = 'http://localhost:8090';

    let points = [];
    let whichFilter = 'ALL';
    let selectedCityDistrict = null;

    let myLocation = {
        "lat": 35.658581,
        "lng": 139.745438
    };

    cityDistrictStore.subscribe(value => {
        selectedCityDistrict = value;
    });

    const fetchPOIs = async () => {
        const url = `${baseURL}/api/collections/point_of_interest/records`;
        const response = await fetch(url);
        const data = await response.json();
        points = data["items"];
        points = points.map(point => ({...point, enabled: false}));
    }

    $: {
        points;
        POIStore.set(points.filter(point => point.enabled));
    }

    $: {
        whichFilter;
        selectedCityDistrict;
        filterPoints()
    }

    const filterPoints = async () => {
        await fetchPOIs();
        if (selectedCityDistrict.city) {
            points = points.filter(point => point.city === selectedCityDistrict.city.id);
        }
        if (whichFilter !== 'ALL') {
            points = points.filter(point => point.which === whichFilter);
        }

    }

    const getDirections = async () => {
        // &mode=transit => Subway
        // &mode=walking => Walking
        const origin = `${myLocation.lat},${myLocation.lng}`;
        const destination = '35.710062,139.8107';
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&mode=subway&key=${DIRECTIONS_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        const routes = data.routes;
        console.log()
        activeRouteStore.set(routes);
    }

    onMount(async () => {
        await fetchPOIs();
    })

</script>
<div class="card p-3 m-2 bg-white shadow-lg">
    <button class="btn btn-accent" on:click={getDirections}>TEST DIRECTIONS</button>
    <div class="flex flex-row items-center justify-between">
        <h1 class="text-gray-700 text-md">Points Of Interest</h1>
        {#if selectedCityDistrict.city}
            <div class="badge badge-neutral text-white">{selectedCityDistrict.city?.name}</div>
        {/if}
    </div>
    <hr class="bg-gray-200 my-3">
    <h2 class="text-gray-700 text-sm">Filters</h2>
    <div class="flex flex-row items-center p-1 justify-around flex-shrink-0 flex-grow w-full">
        <div class="flex flex-row items-center gap-1 text-gray-700">
            <input type="radio" name="which" class="radio" bind:group={whichFilter} value="ALL"/> All
        </div>
        <div class="flex flex-row items-center gap-1">
            <input type="radio" name="which" class="radio radio-primary" bind:group={whichFilter} value="UCA"/>
            <img src="usso.png"
                 class="w-8 h-8 mask mask-circle"
                 alt="Uca"/>
        </div>
        <div class="flex flex-row items-center gap-1">
            <input type="radio" name="which" class="radio radio-secondary" bind:group={whichFilter} value="UFI"/>
            <img src="peda.png"
                 class="w-8 h-8 mask mask-circle object-cover"
                 alt="Ufi"/>
        </div>
    </div>
    <hr class="bg-gray-200 my-3">
    <div class="flex flex-col overflow-y-auto h-[400px]">
        {#each points as point}
            <div class="rounded-lg p-1 bg-gray-100 border border-gray-200 flex items-center justify-between gap-2 mb-2">
                <div class="flex flex-row items-center">
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <input type="checkbox" class="checkbox bg-white checkbox-primary"
                                   bind:checked={point.enabled}
                            />
                        </label>
                    </div>
                    <span class="text-gray-700">{point.name}</span>
                </div>
                {#if point.which === 'UFI'}
                    <div class="badge bg-rose-300 text-rose-700 border-0 px-2">Ufi</div>
                {:else}
                    <div class="badge bg-cyan-300 text-cyan-700 border-0 px-2">Uca</div>
                {/if}
            </div>
        {/each}
    </div>
</div>