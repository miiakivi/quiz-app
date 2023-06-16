import "./assets/main.css";
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";

import { createPinia } from "pinia";
import router from "./router";


import App from "./App.vue";

const cache = new InMemoryCache();

const apolloClient = new ApolloClient( {
  cache,
  uri: "http://localhost:4000/",
} );

const app = createApp( {
  setup () {
    provide( DefaultApolloClient, apolloClient );
  },

  render: () => h( App ),
} );

app.use( createPinia() );
app.use( router );

app.mount( "#app" );
