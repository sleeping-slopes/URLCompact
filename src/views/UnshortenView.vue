<template>
  <template v-if="shortcut && loaded">
    <section class="panel" v-if="error">
      <h1>{{ error }}</h1>
      <router-link :to="{ name: 'Unshorten'}">
        <button class="button-primary">Unshorten another short URL</button>
      </router-link>
      <br>
      <router-link :to="{ name: 'Shorten'}">
        <button class="button-primary">Shorten another URL</button>
      </router-link>
    </section>
    <section class="panel" v-else>
      <h1>Long URL</h1>
      <p>The destitation page of <a :href="$window+'/u/'+shortcut">{{$window+"/u/"+shortcut}}</a></p>
      <h2><a :href="url">{{url}}</a></h2>
      <router-link :to="{ name: 'Unshorten'}">
        <button class="button-primary">Unshorten another short URL</button>
      </router-link>
      <br>
      <router-link :to="{ name: 'Shorten'}">
        <button class="button-primary">Shorten another URL</button>
      </router-link>
    </section>
  </template>
  <section class="panel" v-else>
    <h1>Enter the short URL to check the destination page</h1>
    <form class="form-url" @submit.prevent="redirect">
      <input type="text" v-model="shortcutInput">
      <input type="submit" class="button-primary" value="Unshorten URL">
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
    let url = undefined;
    let error = undefined;
    if (props.shortcut)
    {
      const res = await API.get("shortcuts",{params:{id: props.shortcut}});
      [url,error] = [res.url,res.error];
      loaded = true;
    }

    const redirect = () =>
    {
      let u = shortcutInput.value;
      u = u.substring(u.lastIndexOf("/") + 1);
      router.push({name:"Unshorten",query: {u: u}});
    }
    return { shortcutInput, redirect, loaded, url, error };
  }
}

</script>