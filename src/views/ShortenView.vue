<template>
  <section class="panel">
    <h1>Paste the URL to be shortened</h1>
    <form class="form-url" @submit.prevent="shortenURL">
      <input type="text" v-model="URL">
      <input type="submit" class="button-primary" value="Shorten URL">
    </form>
    <h4 v-if="!validURL" style="color:red">Enter valid URL</h4>
    <p>
      URLCompact is a free tool to shorten URLs and generate short links
      URL shortener allows to create a shortened link making it easy to share
    </p>
  </section>
  <section class="panel">
    <h2>Simple and fast URL shortener!</h2>
    <p>
      URLCompact allows to shorten long links.
      Just paste the long URL and click the Shorten URL button. On the next page, copy the shortened URL and share it on sites, chat and emails.
      After shortening the URL, check <router-link :to="{ name: 'Stats'}">how many clicks it received</router-link>
    </p>
  </section>
  <section>
    <div class="advantage-list">
      <div class="panel advantage-card">
        <h3>Easy</h3>
        <i class="bi bi-hand-thumbs-up"></i>
        <p>URLCompact is easy and fast, enter the long link to get your shortened link</p>
      </div>
      <div class="panel advantage-card">
        <h3>Shortened</h3>
        <i class="bi bi-link-45deg"></i>
        <p>Use any link, no matter what size, URLCompact always shortens</p>
      </div>
      <div class="panel advantage-card">
        <h3>Statistics</h3>
        <i class="bi bi-graph-up"></i>
        <p>Check the number of clicks that your shortened URL received</p>
      </div>
    </div>
  </section>
</template>

<script>

import { ref } from "vue"
import router from "./../router/index"
import API from "./../axios/API"

export default
{
  name: "ShortenView",
  props: { shortcut: String },
  setup(props)
  {
    if (props.shortcut)
    {
      alert(1)
    }
    const URL = ref("");
    let validURL = ref(true);

    const shortenURL = async () =>
    {
      const urlPattern = new RegExp('^(https?:\\/\\/)?'+
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+
	    '(\\#[-a-z\\d_]*)?$','i');

      validURL.value = !!urlPattern.test(URL.value);
      if (validURL.value)
      {
        let u = URL.value;
        if (!u.startsWith("https://") && !u.startsWith("http://"))
        {
          u = "https://"+u;
        }
        const shortcut = await API.get("shortcuts",{params:{url: u}});
        if (!shortcut.error)
        {
          router.push({name:"Shortener",query: {u: shortcut.id }});
        }
        else
        {
          const newShortcut = await API.post('shortcuts',{ url: u });
          router.push({name:"Shortener",query: {u: newShortcut.id }});
        }
      }

    }
    return { URL, shortenURL,validURL };
  }
}

</script>