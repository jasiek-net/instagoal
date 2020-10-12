<template>
  <div v-if="tab !== 'summary'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 my-16">
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
        Wybierz zakładkę w której są 3 poziomy, zakładka powinna
        <a :href="sheetURL" target="_blank">wyglądać jak tutaj</a>.
      </p>
      <select :disabled="options.length === 0" v-model="sheetTab" class="w-full mt-4">
        <option disabled value="">Wybierz zakładkę</option>
        <option v-for="o in options" :key="o">{{ o }}</option>
      </select>
    </div>

    <div></div>
    <button :disabled="url == '' || sheetTab == ''" class="w-full" @click="click">stwórz landing!</button>
  </div>
  <div v-else class="flex justify-center p-16">
    Work in progress ;)
  </div>
</template>

<script>
import { outURL } from '@/urls';
import { API, KEY, REG } from '@/utils';

export default {
  props: {
    tab: {
      type: String,
      required: true,
      validator: t => ['basic', 'advanced', 'summary'].indexOf(t) !== -1,
    }
  },
  data() {
    return {
      url: '',
      options: [],
      sheetID: '',
      sheetTab: '',
    }
  },
  computed: {
    sheetURL() {
      return outURL[this.tab];
    },
  },
  methods: {
    click() {
      switch(this.tab) {
        case 'basic': return this.$router.push('/v1/' + btoa(`${ this.sheetID }/values/${ this.sheetTab }`));
        case 'advanced': return this.$router.push('/v2/' + btoa(`${ this.sheetID }/values/${ this.sheetTab }`));
        case 'summary': return this.$router.push('/summary/' + btoa(`${ this.sheetID }/values/${ this.sheetTab }`));
      }
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
