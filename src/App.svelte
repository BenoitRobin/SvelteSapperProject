<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./Meetups/MeetUpGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetUpItem from "./Meetups/MeetUpItem.svelte";

  // let meetups =

  let editMode;

  function addMeetUp(event) {
    const meetupData = {
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      address: event.detail.address,
      contactEmail: event.detail.email,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
    };

    meetups.addMeetup(meetupData);
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    meetups.toggleFavorite(id);
  }
</script>

<style>
  main {
    padding-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetUp} on:cancel={cancelEdit} />
  {/if}
  <MeetUpGrid meetups={$meetups} on:togglefavorite={toggleFavorite} />
</main>
