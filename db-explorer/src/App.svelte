<script lang="ts">
  import DatabaseConnection from './components/DatabaseConnection.svelte';
  import QueryRunner from './components/QueryRunner.svelte';

  let isConnected = $state(false);
  let queryResult = $state('');

  async function checkConnection() {
    try {
      const response = await fetch('http://localhost:3000/check-connection', {
        method: 'GET',
        credentials: 'include' // Include credentials (cookies) with the request
      });
      if (response.ok) {
        const result = await response.json();
        isConnected = result.isConnected;
      }
    } catch (error) {
      console.error('Failed to check connection status:', error);
    }
  }

  async function handleConnect(details: { dbType: string, host: string, port: string, user: string, password: string, database: string }) {
    try {
      const response = await fetch('http://localhost:3000/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
        credentials: 'include' // Include credentials (cookies) with the request
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
        body: JSON.stringify({ query }),
        credentials: 'include' // Include credentials (cookies) with the request
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

  // Check connection status on mount
  checkConnection();
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
