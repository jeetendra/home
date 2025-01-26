<script lang="ts">
  let query = $state('');
  
    let { queryResult, onRunQuery} = $props();
  function handleRunQuery() {
    onRunQuery(query);
  }
</script>

<h2>Run Query</h2>
<textarea bind:value={query} placeholder="Enter your SQL query here"></textarea>
<button on:click={handleRunQuery}>Run Query</button>
<div>
    <pre>{JSON.stringify(queryResult, null, 2)}</pre>
</div>

<style>
  textarea {
    width: 100%;
    height: 10em;
    margin-top: 1em;
  }
  
  pre {
    background: #f4f4f4;
    padding: 1em;
    margin-top: 1em;
    text-align: start;
  }
</style>
