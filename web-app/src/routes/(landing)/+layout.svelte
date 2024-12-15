<script lang="ts">

  export let data;
  
  if(typeof window !== 'undefined')  
    window.data = data;

</script>

<slot data={data} />
  