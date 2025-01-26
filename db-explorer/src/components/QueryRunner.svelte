<script lang="ts">
  export let query = '';
  export let queryResult = '';
  export let onRunQuery: (query: string) => void;

  function handleRunQuery() {
    onRunQuery(query);
  }
</script>

<h2>Run Query</h2>
<textarea bind:value={query} placeholder="Enter your SQL query here"></textarea>
<button on:click={handleRunQuery}>Run Query</button>
<pre>{JSON.stringify(queryResult)}</pre>

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
  }
</style>
