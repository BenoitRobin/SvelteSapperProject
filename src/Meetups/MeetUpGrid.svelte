<script>
    import MeetUpItem from './MeetUpItem.svelte';

    export let meetups;
</script>

<style>
    
section {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

@media (min-width: 768px) {
    section {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>

<section id="meetups">
    
    {#each meetups as meetUp}
        <MeetUpItem
            title={meetUp.title}
            subtitle={meetUp.subtitle}
            description={meetUp.description}
            imageUrl={meetUp.imageUrl}
            contactEmail={meetUp.email}
            address={meetUp.address}    
        />
    {/each}
    
    </section>
