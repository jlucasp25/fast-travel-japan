<script>
    import {cityStore} from "./stores.js";
    import {typesOfAreas} from "./enums.js";

    export let cities = {};

    let selectedCity = Object.keys(cities)[0];
    let areas = [];



    cityStore.subscribe(city => {
        selectedCity = city;
    });

</script>
<div class="border border-gray-200 p-2 m-2 shadow-lg">
    <div class="flex flex-col">
        <label class="text-gray-700 mb-2">City</label>
        <select class="border-gray-200 border p-1 shadow-md" bind:value={selectedCity}>
            {#each Object.keys(cities) as city}
                <option value={city}>{city}</option>
            {/each}
        </select>
        <hr class="bg-gray-200 my-3">
        <label class="text-gray-700 mb-2">Area</label>
        <select class="border-gray-200 border p-1 shadow-md" bind:value={selectedCity}>
            {#each Object.keys(cities) as city}
                <option value={city}>{city}</option>
            {/each}
        </select>
    </div>
</div>
<div class="border border-gray-200 p-2 m-2 shadow-lg">
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