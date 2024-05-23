<script>
    import {onMount} from "svelte";
    import {cityDistrictStore} from "./stores.js";

    const baseURL = 'http://localhost:8090';

    let cities = [];
    let selectedCity = null;
    let districts = [];
    let selectedDistrict = null;
    let enableCityPoly = false;
    let enableDistrictPoly = false;

    const fetchCities = async () => {
        const url = `${baseURL}/api/collections/city/records/`;
        const response = await fetch(url);
        const data = await response.json();
        cities = data["items"];
    }

    const fetchDistricts = async () => {
        if (selectedCity === null) {
            return;
        }
        const url = `${baseURL}/api/collections/district/records?filter=city='${selectedCity}'`;
        const response = await fetch(url);
        const data = await response.json();
        districts = data["items"];
    }

    $: cityDistrictStore.set({
        city: cities.find(cty => selectedCity === cty.id),
        district: districts.find(dst => selectedDistrict === dst.id),
        enableCityPoly: enableCityPoly,
        enableDistrictPoly: enableDistrictPoly
    });

    onMount(async () => {
        await fetchCities();
        await fetchDistricts();
    });
</script>
<div class="card p-3 mt-2 bg-white shadow-lg">
    <div class="flex flex-col">
        <label for="city-select" class="text-gray-700 mb-2">City</label>
        <select class="select select-bordered bg-white text-gray-600" bind:value={selectedCity}
                id="city-select"
                on:change={() => fetchDistricts()}>
            <option value="{null}">Select City</option>
            {#each cities as city}
                <option value={city.id}>{city.name}</option>
            {/each}
        </select>
        <div class="flex flex-row gap-2 mt-2 items-center">
            <label class="text-xs text-gray-700" for="city-poly-toggle">Display Outline?</label>
            <input type="checkbox" class="toggle toggle-success toggle-sm [--tglbg:white]" id="city-poly-toggle"
                   bind:checked={enableCityPoly}/>
        </div>
        <hr class="bg-gray-200 my-3">
        <label for="district-select" class="text-gray-700 mb-2">Area</label>
        <select id="district-select" class="select select-bordered bg-white text-gray-600" bind:value={selectedDistrict}>
            <option value="{null}">Select Area</option>
            {#each districts as district}
                <option value={district.id}>{district.name}</option>
            {/each}
        </select>
        <div class="flex flex-row gap-2 mt-2 items-center">
            <label class="text-xs text-gray-700" for="district-poly-toggle">Display Outline?</label>
            <input type="checkbox" class="toggle toggle-success toggle-sm [--tglbg:white]" id="district-poly-toggle"
                   bind:checked={enableDistrictPoly}/>
        </div>
    </div>
</div>