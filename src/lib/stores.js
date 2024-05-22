import {writable} from 'svelte/store';

export const cityDistrictStore = writable({
    city: null,
    district: null,
    enableCityPoly: false,
    enableDistrictPoly: false,
});