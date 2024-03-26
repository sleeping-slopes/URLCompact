<template>
  <template v-if="shortcut && loaded">
    <section class="panel" v-if="error">
      <h1>{{ error }}</h1>
      <router-link :to="{ name: 'Stats'}">
        <button class="button-primary">Track clicks from another short URL</button>
      </router-link>
      <br>
      <router-link :to="{ name: 'Shorten'}">
        <button class="button-primary">Shorten another URL</button>
      </router-link>
    </section>
    <section class="panel" v-else>
      <h1>Total URL Clicks</h1>
      <p>The number of clicks on <a :href="$window+'/u/'+shortcut">{{$window+"/u/"+shortcut}}</a> that redirected the user to the destination page</p>
      <h2>{{ clicks }}</h2>
      <router-link :to="{ name: 'Stats'}">
        <button class="button-primary">Track clicks from another short URL</button>
      </router-link>
      <br>
      <router-link :to="{ name: 'Shorten'}">
        <button class="button-primary">Shorten another URL</button>
      </router-link>
    </section>
  </template>
  <section class="panel" v-else>
    <h1>Enter the URL to track how many clicks it received</h1>
    <form class="form-url" @submit.prevent="redirect">
      <input type="text" v-model="shortcutInput">
      <input type="submit" class="button-primary" value="Track clicks">
    </form>
    <p>
      Example: {{$window}}/u/AbCdE
    </p>
  </section>
</template>

<script>

import { ref } from "vue"
import router from "./../router/index"
import API from "./../axios/API"

export default
{
  name: "UnshortenView",
  props: { shortcut: String },
  async setup(props)
  {
    const shortcutInput = ref("");
    let loaded = false;
    let clicks = undefined;
    let error = undefined;
    if (props.shortcut)
    {
      const res = await API.get("shortcuts",{params:{id: props.shortcut}});
      [clicks,error] = [res.clicks,res.error];
      loaded = true;
    }

    const redirect = () =>
    {
      let u = shortcutInput.value;
      u = u.substring(u.lastIndexOf("/") + 1);
      router.push({name:"Stats",query: {u: u }});
    }
    return { shortcutInput, redirect, loaded, clicks, error };
  }
}

</script>