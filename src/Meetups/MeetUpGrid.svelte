<script>
  import MeetUpItem from "./MeetUpItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import App from "../App.svelte";

  export let meetups;

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
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
</section>

<section id="meetups">
  {#each filterMeetups as meetUp}
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
  {/each}
</section>
