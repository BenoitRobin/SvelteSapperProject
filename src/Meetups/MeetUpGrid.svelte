<script>
  import MeetUpItem from "./MeetUpItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  export let meetups;

  const dispatch = createEventDispatcher();

  let favsOnly = false;

  $: filterMeetups = favsOnly ? meetups.filter((m) => m.isFavorite) : meetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #no-meetup {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>
{#if filterMeetups.length === 0}
  <p id="no-meetup">No meetup found, you can start adding some.</p>
{/if}

<section id="meetups">
  {#each filterMeetups as meetUp (meetUp.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetUpItem
        id={meetUp.id}
        title={meetUp.title}
        subtitle={meetUp.subtitle}
        description={meetUp.description}
        imageUrl={meetUp.imageUrl}
        email={meetUp.contactEmail}
        address={meetUp.address}
        isFav={meetUp.isFavorite}
        on:showDetails
        on:edit />
    </div>
  {/each}
</section>
