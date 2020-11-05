<script>
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./Meetups/MeetUpGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetUpItem from "./Meetups/MeetUpItem.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to use Svelte to build your SPA",
      imageUrl:
        "https://www.numerama.com/content/uploads/2016/11/open-data-code.jpg",
      address: "27 Nerd Road, 32523 New York",
      contactEmail: "code@test.com",
      isFavorite: false,
    },
    {
      id: "m2",
      title: "Swim together",
      subtitle: "Let's go for swimming",
      description: "We will simply swim some rounds",
      imageUrl:
        "https://res.cloudinary.com/sagacity/image/upload/c_crop,h_731,w_1097,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1200/Superior_Pools_Residential_Restoration_sby0yt.jpg",
      address: "44, rue Bezout 75014 Paris",
      contactEmail: "swim@test.com",
      isFavorite: false,
    },
  ];

  let editMode;

  function addMeetUp(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      address: event.detail.address,
      contactEmail: event.detail.email,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find((m) => m.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex((m) => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
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
  <MeetUpGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
