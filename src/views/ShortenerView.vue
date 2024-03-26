<template>
  <section class="panel">
    <h1>Your shortened URL</h1>
    <form class="form-url" @submit.prevent="copyLink">
      <input type="text" :value="shortcutURL" readonly="true">
      <input type="submit" class="button-primary" value="Copy URL">
    </form>
    <p>Long URL: <a :href="URL">{{ URL }}</a></p>
    <router-link :to="{ name: 'Stats',query:{u:shortcut}}">
      <button class="button-primary">Total of clicks of your short URL</button>
    </router-link>
    <br>
    <router-link :to="{ name: 'Shorten'}">
      <button class="button-primary">Shorten another URL</button>
    </router-link>
    <br>
    <p>Copy the short link and share it in messages, texts, posts, websites and other locations</p>
  </section>
</template>

<script>

import router from "./../router/index"

import API from "./../axios/API"

export default
{
  name: "ShortenView",
  props: { shortcut: String },
  async setup(props)
  {
    if (!props.shortcut) router.push({ name:"Shorten" });
    const res = await API.get("shortcuts",{params:{id: props.shortcut}});
    if (res.error) router.push({ name:"Shorten" });
    const shortcutURL = window.location.origin+"/u/"+props.shortcut;
    const URL = res.url;
    const copyLink = () =>
    {
      navigator.clipboard.writeText(shortcutURL);
    }
    return { URL, shortcutURL,copyLink };
  }
}

</script>