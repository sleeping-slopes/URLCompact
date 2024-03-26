<template>
<header>
<router-link class="logo" :to="{ name: 'Shorten'}">URLCompact</router-link>
</header>
<main>
  <Suspense>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </router-view>
    </template>
    <template #fallback>
      <section class="panel">
        <h1>Loading...</h1>
      </section>
    </template>
  </Suspense>
</main>
<footer>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'Shorten'}">Shorten URL</router-link></li>
      <li><router-link :to="{ name: 'Stats'}">URL stats</router-link></li>
      <li><router-link :to="{ name: 'Unshorten'}">Unshorten URL</router-link></li>
    </ul>
  </nav>
  <div class="project-info">
    <section>
      <h4>About website</h4>
      <p>Non-commercial project created solely for demonstration purposes.</p>
    </section>
    <section>
      <h4>Technologies used</h4>
      <p>
        Frontend: HTML, CSS, Vue.js, Axios;<br>
        Backend: Express.js, MySQL.
      </p>
    </section>
    <section>
      <h4>Created by</h4>
      <p style="white-space: nowrap;"><a href="https://github.com/sleeping-slopes" target=”_blank” rel="noopener noreferrer" >@sleeping-slopes</a></p>
    </section>
    <section>
      <h4>Language:</h4>
      <p style="white-space: nowrap;">English (US)</p>
    </section>
  </div>
</footer>
</template>