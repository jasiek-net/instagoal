<template>
  <div class="container my-16 lg:px-40 xl:px-64">
    <div class="text-center">
      <h1 class="header">
        Instagoal
      </h1>
    </div>
    <br />
    <br />
    <p>
      Projekt służy jako rozszerzenie kursu <a class="link" :href="outURL.trzypoziomy" target="_blank">trzypoziomy.pl</a>, po wklejeniu linka do Google Sheets możliwe jest wygenerowanie strony z trzema poziomami w wersji
      <router-link :to="appURL.v1">
        basic
      </router-link>
      lub
      <router-link :to="appURL.v2">
        advanced</router-link>.
<!--
      <br />
      <br />
      Po zalogowaniu się przez konto Google możliwe jest tworzenie miesięcznych podsumowań i przechowywanie ich w swoim Google Sheets (najlepiej stworzyć pod to dedykowaną zakładkę).
 -->
      <br />
      <br />
      Wybierz rodzaj widoku i kieruj się poniższymi krokami:
      <br />
      <br />
    </p>
    <div class="grid grid-cols-1 gap-10 sm:grid-cols-3">
      <button
        v-for="b in buttons"
        :key="b"
        @click="tab = b"
        :class="tab === b && 'bg-white text-blue-500'">
        {{ b }}
      </button>
    </div>
    <Steps :tab="tab" />
  </div>
</template>

<script>
import { appURL, outURL } from '@/urls';
import Steps from '@/components/Steps';

export default {
  components: {
    Steps,
  },
  data() {
    return {
      appURL,
      outURL,
      tab: 'basic',
      buttons: [ 'basic', 'advanced', 'summary' ]
    }
  },
}
</script>
