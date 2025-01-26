<script lang="ts">
  import DatabaseConnection from './components/DatabaseConnection.svelte';
  import QueryRunner from './components/QueryRunner.svelte';
  
  let isConnected = $state(false);
  let queryResult = $state('');

  async function handleConnect(details: { host: string, port: string, user: string, password: string, database: string }) {
    try {
      const response = await fetch('http://localhost:3000/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      });
      if (response.ok) {
        isConnected = true;
        alert('Connected to database');
      } else {
        alert('Failed to connect to database');
      }
    } catch (error) {
      alert('Failed to connect to database');
    }
  }

  async function handleRunQuery(query: string) {
    try {
      const response = await fetch('http://localhost:3000/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (response.ok) {
        queryResult = await response.json();
      } else {
        alert('Failed to run query');
      }
    } catch (error) {
      alert('Failed to run query');
    }
  }
</script>

<main>
  {#if !isConnected}
    <DatabaseConnection
      onConnect={handleConnect}
    />
  {:else}
    <QueryRunner
      {queryResult}
      onRunQuery={handleRunQuery}
    />
  {/if}
</main>

<style>
  main {
    padding: 1em;
  }
</style>
