<script>
    import {typesOfAreas} from "./enums.js";
    import {onMount} from "svelte";

    const baseURL = 'http://localhost:8090';

    let cities = [];
    let selectedCity = null;
    let areas = [];
    let selectedArea = null;

    const fetchCities = async () => {
        const url = `${baseURL}/api/collections/city/records/`;
        const response = await fetch(url);
        const data = await response.json();
        cities = data["items"];
        selectedCity = cities[0].id;
    }

    const fetchAreas = async () => {
        if (selectedCity === null) {
            return;
        }
        const url = `${baseURL}/api/collections/areas/records?filter=city='${selectedCity}'`;
        const response = await fetch(url);
        const data = await response.json();
        areas = data["items"];
        selectedArea = areas[0].id;
    }

    onMount(async () => {
        await fetchCities();
        await fetchAreas();
    });

</script>
<div class="card p-2 m-2 bg-white shadow-lg">
    <div class="flex flex-col">
        <label class="text-gray-700 mb-2">City</label>
        <select class="select select-bordered bg-white text-gray-600" bind:value={selectedCity}>
            {#each cities as city}
                <option value={city.id}>{city.name}</option>
            {/each}
        </select>
        <hr class="bg-gray-200 my-3">
        <label class="text-gray-700 mb-2">Area</label>
        <select class="select select-bordered bg-white text-gray-600" bind:value={selectedArea}>
            {#each areas as area}
                <option value={area.id}>{area.name}</option>
            {/each}
        </select>
    </div>
</div>
<div class="card p-2 m-2 bg-white shadow-lg">
    <div class="flex flex-col">
        <label class="text-gray-700 mb-2">Areas of Interest</label>
        {#if areas.length === 0}
            <div class="bg-amber-200 text-center p-3 shadow-md rounded-2xl">
                <span class="p-2 text-gray-700 text-center">No areas of interest</span>
            </div>
        {/if}
        <hr class="bg-gray-200 my-3">
        <label class="text-gray-700 mb-2">Filter by type</label>
        <div class="grid grid-cols-3 gap-2">
            {#each typesOfAreas as type}
                <div class="w-100 text-xs text-center bg-cyan-50 hover:bg-cyan-200 text-gray-700 p-2 rounded-md shadow-md text-wrap">{type}</div>
            {/each}
        </div>
        <hr class="bg-gray-200 my-3">
        <label class="text-gray-700 mb-2">Filter by person</label>
        <div class="grid grid-cols-2 gap-2">
            <div class="w-100 text-xs text-center bg-cyan-50 hover:bg-cyan-200 text-gray-700 p-2 rounded-md shadow-md text-wrap">
                Uca
            </div>
            <div class="w-100 text-xs text-center bg-rose-50 hover:bg-rose-200 text-gray-700 p-2 rounded-md shadow-md text-wrap">
                Ufi
            </div>
        </div>
        <hr class="bg-gray-200 my-3">
        <button class="bg-cyan-400 hover:bg-cyan-500 text-white p-2 rounded-md shadow-md">Add Area</button>
    </div>
</div>