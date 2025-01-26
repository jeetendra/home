<script lang="ts">
  export let host = '';
  export let port = '';
  export let user = '';
  export let password = '';
  export let database = '';
  export let onConnect: (details: { host: string, port: string, user: string, password: string, database: string }) => void;

  function handleConnect(e) {
    e.preventDefault();
    onConnect({ host, port, user, password, database });
  }
</script>

<h2>Database Connection</h2>
<form onsubmit={handleConnect}>
  <label>
    Host:
    <input type="text" bind:value={host} />
  </label>
  <label>
    Port:
    <input type="text" bind:value={port} />
  </label>
  <label>
    User:
    <input type="text" bind:value={user} />
  </label>
  <label>
    Password:
    <input type="password" bind:value={password} />
  </label>
  <label>
    Database:
    <input type="text" bind:value={database} />
  </label>
  <button type="submit">Connect</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }
</style>
