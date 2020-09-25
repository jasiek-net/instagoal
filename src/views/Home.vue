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
      Projekt służy do generowania prostych stron www w oparciu o dane z Google Sheets. Póki co gotowy jest widok oparty na kursie <a class="link" href="https://trzypoziomy.pl/" target="_blank">trzypoziomy.pl</a>, roadmapa dostępna jest na <a href="https://github.com/janhorubala/" target="_blank">githubie</a>.
      <br />
      <br />
      Zobacz jak wygląda
      <router-link to="/v1/MWp5WThzMHBLSjVLbDJUNmNCSGpjVi1HX3FhNG5QV3Z3LW1yUFE5SGYwMzQvMg">
        przykładowa strona
      </router-link> lub wygeneruj link z własnymi celami kierując się poniższymi krokami (arkusz powinien być podobny <a target="_blank" href="https://docs.google.com/spreadsheets/d/1jyY8s0pKJ5Kl2T6cBHjcV-G_qa4nPWvw-mrPQ9Hf034/edit#gid=1941808675">do tego</a>).
    </p>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 my-24">

      <div>
        <h4 class="header">Krok 1</h4>
        <br />
        <br />
        Otwórz swój arkusz i wybierz
        <br />
        <span class="font-medium">File > Publish to the web</span>.
      </div>
      <img src="@/assets/step1.jpg" />

      <div>
        <h4 class="header">Krok 2</h4>
        <br />
        <br />
        Kliknij
        <span class="font-medium">Publish</span>, a potem
        <span class="font-medium">OK</span>.
        <br />
        Twój arkusz jest już dostępny!
      </div>
      <img src="@/assets/step2.jpg" />

      <div>
        <h4 class="header">Krok 3</h4>
        <br />
        <br />
        Wklej poniżej adres URL arkusza.
        <br />
        Właściwy URL to adres z paska przeglądarki!
      </div>
      <img src="@/assets/step3.jpg" />

      <div class="sm:col-span-2">
        <input
          class="w-full"
          v-model="url"
          placeholder="https://docs.google.com/spreadsheets/d/1jyY8s0pKJ5Kl2T6cBHjcV-G_qa4nPWvw-mrPQ9Hf034/edit" />
        <br />
      </div>

      <div>
        <h4 class="header">Krok 4</h4>
        <br />
        <br />
        Wybierz który numer z koleii ma arkusz z celami i kliknij STWÓRZ LANDING!
        <br />
      </div>

      <div>
        <img src="@/assets/step4.jpg" />
        <div class="flex flex-col mt-8">
          <select class="w-full mb-4" v-model="id">
            <option disabled value="Numer arkusza">Numer arkusza</option>
            <option v-for="o in Array(20).fill().map((n, i) => i + 1)" :key="o">{{ o }}</option>
          </select>
          <button class="w-full" @click="create">stwórz landing!</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 'Numer arkusza',
      url: null,
    }
  },
  methods: {
    create() {
      const paths = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(this.url);
      console.log(paths)
      if (paths === null || paths.length < 2) {
        return alert('Nieprawidłowy adres URL!');
      }
      const sheetID = paths[1];
      if (!sheetID) {
        return alert('Nieprawidłowy adres URL!');
      }
      const tabID = this.id;
      if (isNaN(tabID)) {
        return alert('Nieprawidłowy numer arkusza!');
      }
      this.$router.push('/v1/' + btoa(`${ sheetID }/${ tabID }`))
    }
  }
}
</script>




