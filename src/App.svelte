<script>
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./Meetups/MeetUpGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

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
    },
  ];

  function addMeetUp() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      address: address,
      contactEmail: email,
      description: description,
      imageUrl: imageUrl,
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<style>
  main {
    padding-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetUp}>
    <TextInput
      id="title"
      label="Title"
      type="text"
      value={title}
      on:input={(event) => (title = event.target.value)} />

    <TextInput
      id="subtitle"
      label="Subtitle"
      type="text"
      value={subtitle}
      on:input={(event) => (subtitle = event.target.value)} />

    <TextInput
      id="address"
      label="Address"
      type="text"
      value={address}
      on:input={(event) => (address = event.target.value)} />

    <TextInput
      id="email"
      label="E-mail"
      type="email"
      value={email}
      on:input={(event) => (email = event.target.value)} />

    <TextInput
      id="imageUrl"
      label="Image URL"
      type="text"
      value={imageUrl}
      on:input={(event) => (imageUrl = event.target.value)} />

    <TextInput
      id="description"
      label="Description"
      value={description}
      controlType="textarea"
      on:input={(event) => (description = event.target.value)} />

    <Button type="submit" caption="Save" />
  </form>
  <MeetUpGrid {meetups} />
</main>
