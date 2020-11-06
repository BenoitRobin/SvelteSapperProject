<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./Meetups/MeetUpGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetUpItem from "./Meetups/MeetUpItem.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import Loading from "./UI/LoadingSpinner.svelte";

  // let meetups =

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};
  let isLoading = true;

  fetch("https://meetup-e03f8.firebaseio.com/meetups.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Fetching meetups failed, please try later!");
      }
      return res.json();
    })
    .then((data) => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({
          ...data[key],
          id: key,
        });
      }
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetup(loadedMeetups);
      }, 1000);
    })
    .catch((err) => {
      isLoading = false;
      console.log(err);
    });

  function savedMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }
</script>

<style>
  main {
    padding-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <Loading />
    {:else}
      <MeetUpGrid
        meetups={$meetups}
        on:showDetails={showDetails}
        on:edit={startEdit}
        on:add={() => {
          editMode = 'edit';
        }} />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
