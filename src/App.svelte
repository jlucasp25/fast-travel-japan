<script>
    import POIManager from "./lib/POIManager.svelte";
    import BookingWatcher from "./lib/BookingWatcher.svelte";

    let showPOIManager = true;
    let showBookingWatcher = false;

    const togglePOIManager = () => {
        showPOIManager = !showPOIManager;
        showBookingWatcher = !showBookingWatcher;
    }
</script>
<div class="d-flex flex-col bg-white">
    <aside class="bg-gray-100 p-2 border-b border-gray-400">
        <div class="card bg-white p-2">
            <button class="btn btn-ghost" on:click={togglePOIManager}>Swap Views</button>
        </div>
    </aside>
    <div class="{showPOIManager ? 'flex' : 'hidden'}">
        <POIManager/>
    </div>
    <div class="{showBookingWatcher ? 'flex' : 'hidden'}">
        <BookingWatcher/>
    </div>
</div>
