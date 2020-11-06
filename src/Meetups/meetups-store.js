import { writable } from "svelte/store";


const meetups = writable([
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
    }
  ]);

  const customMeetupsStore = {
      subscribe: meetups.subscribe,
      addMeetup: (meetupData) => {
          const newMeetup = {
              ...meetupData,
              id: Math.random().toString(),
              isFavorite: false
          };
          meetups.update(items => {
              return [newMeetup, ...items];
          })
      },
      updateMeetup: (id, meetupData) => {
        meetups.update(items => {
          const meetupIndex = items.findIndex(i => i.id === id);
          const updateMeetup = { ...items[meetupIndex], ...meetupData };
          const updatedMeetups = [...items];
          updatedMeetups[meetupIndex] = updateMeetup;
          return updatedMeetups;

        })
      },

      toggleFavorite: (id) => {
          meetups.update(items => {
            const updatedMeetup = { ...items.find((m) => m.id === id) };
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = items.findIndex((m) => m.id === id);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
          });
      }

  };

  export default customMeetupsStore;