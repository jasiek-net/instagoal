<template>
  <div class="container my-16 lg:px-40 xl:px-64">
    <div class="text-center">
      <h1 class="header">
        instagoal
      </h1>
    </div>
    <br />
    <br />
    <p>
      Instagoal służy do generowania landing page'y w oparciu o dane z Google Sheets. Póki co gotowy jest widok oparty na kursie <a class="link" href="https://trzypoziomy.pl/" target="_blank">trzypoziomy.pl</a>, roadmapa dostępna jest na <a href="https://github.com/janhorubala/instagoal" target="_blank">githubie</a>.
      <br />
      <br />
      Zobacz jak wygląda
      <router-link to="/v1/MWp5WThzMHBLSjVLbDJUNmNCSGpjVi1HX3FhNG5QV3Z3LW1yUFE5SGYwMzQvdmFsdWVzL1RSWlkgUE9aSU9NWQ">
        przykładowa strona
      </router-link> lub wygeneruj link z własnymi celami kierując się poniższymi krokami (arkusz powinien być podobny <a target="_blank" href="https://docs.google.com/spreadsheets/d/1jyY8s0pKJ5Kl2T6cBHjcV-G_qa4nPWvw-mrPQ9Hf034/edit#gid=1941808675">do tego</a>).
    </p>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 my-20">
      <img src="@/assets/step1.jpg" />
      <div>
        <h4 class="header">Krok 1</h4>
        <p class="mt-4">
          Wklej adres URL Twojego arkusza (upewnij się, że akrusz jest dostępny publicznie).
        </p>
        <input
          @change="change"
          class="w-full mt-4"
          v-model="url"
          placeholder="https://docs.google.com/spreadsheets/d/1jyY8s0pKJ5Kl2T6cBHjcV-G_qa4nPWvw-mrPQ9Hf034/edit" />
      </div>

      <img src="@/assets/step2.jpg" />
      <div>
        <h4 class="header">Krok 2</h4>
        <p class="mt-4">
          Wybierz zakładkę w której są 3 poziomy.
        </p>
        <select :disabled="options.length === 0" v-model="tab" class="w-full mt-4">
          <option disabled value="">Wybierz zakładkę</option>
          <option v-for="o in options" :key="o">{{ o }}</option>
        </select>
      </div>

      <div></div>
      <button :disabled="url == '' || tab == ''" class="w-full" @click="click">stwórz landing!</button>
    </div>
  </div>
</template>

<script>
import { API, KEY, REG } from '@/utils';

export default {
  data() {
    return {
      tab: '',
      url: '',
      sheetID: '',
      options: [],
    }
  },
  methods: {
    click() {
      return this.$router.push('/v1/' + btoa(`${ this.sheetID }/values/${ this.tab }`))
    },
    change() {
      if (this.url === '') {
        return alert('Adres URL nie może być pusty!')
      }
      const paths = new RegExp(REG).exec(this.url);
      if (paths === null || paths.length < 2) {
        return alert('Nieprawidłowy adres URL!');
      }
      this.sheetID = paths[1];
      if (!this.sheetID) {
        return alert('Nieprawidłowy adres URL!');
      }
      fetch(`${ API }${ this.sheetID }${ atob(KEY) }`)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            if (res.error.code == 403) {
              return alert("Arkusz nie jest udostępniony!\nKliknij File > Share > Change to anyone with the link > DONE")
            } else {
              return alert(res.error.message)
            }
          }
          if (res.sheets && res.sheets.length > 0) {
            this.options = res.sheets.map(s => s.properties.title);
          }
        })
        .catch(err => alert(err.error.message));
    }
  }
}
</script>
