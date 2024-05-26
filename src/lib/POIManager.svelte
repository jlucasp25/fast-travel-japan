<script>
    import DirectionsCard from "./DirectionsCard.svelte";
    import CityAreaController from "./CityDistrictController.svelte";
    import POIList from "./POIList.svelte";
    import MapContainer from "./MapContainer.svelte";
</script>

<div class="flex flex-col md:flex-row bg-gray-100 ">
    <aside class="w-screen md:w-[20vw] p-2 border-r border-gray-400">
        <div class="collapse bg-gray-100">
            <input type="checkbox"/>
            <div class="collapse-title text-xl bg-white font-medium">
                Open to control the map
            </div>
            <div class="collapse-content border-t border-gray-200">
                <CityAreaController/>
                <POIList/>
            </div>
        </div>
    </aside>
    <main class="h-screen w-[100vw] md:w-[80vw] bg-amber-200">
        <MapContainer/>
    </main>
    <DirectionsCard/>
</div>