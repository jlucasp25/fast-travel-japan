<script>
    import {activeRouteStore} from "./stores.js";

    let route = null;
    let directions = null;
    activeRouteStore.subscribe(value => {
        route = value;
        if (route) {
            directions = route[0].legs[0].steps;
        }
    });
</script>
<section class="absolute bottom-0 mb-2 mx-2 w-full z-[999]">
    <div class="stack w-full">
        <div class="card shadow-md bg-white text-primary-content h-[150px] overflow-y-auto">
            <div class="card-body">
                {#if directions}
                    {#each directions as direction}
                        <p>{direction}</p>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</section>
