  <script>

  import router from "./../router/index"
  import API from "./../axios/API"

  export default
  {
    name: "RedirectView",
    props: { shortcut: String },
    async setup(props)
    {
      if (props.shortcut)
      {
        const res = await API.get("shortcuts",{params:{id: props.shortcut}});
        if (res.error)
        {
            // router.push({name:"Shorten"});
        }
        else
        {
            const a = API.patch("shortcuts/"+props.shortcut+"/click");
            location.href = res.url;
        }
      }
    }
  }

  </script>