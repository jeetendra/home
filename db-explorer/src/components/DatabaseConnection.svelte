<script lang="ts">
  
  let host = $state('');
  let port = $state('');
  let user = $state('');
  let password = $state('');
  let database = $state('');
  let { onConnect } = $props();
  
  function handleConnect(e: Event) {
    e.preventDefault();
    onConnect({ host, port, user, password, database });
  }
</script>

<h2>Database Connection</h2>
<form on:submit={handleConnect}>
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
