<template>
  <div class="container lg:px-40 xl:px-64 mb-24">
    <button @click="apply">
      Wyślij
    </button>
    <textarea
      v-model="summary"
      class="w-full h-64 p-4 outline-none shadow-lg bg-white border"
      placeholder="Ogólne podsumowanie miesiąca..."
    />
    <div
      v-for="(row, i) in data"
      :key="i"
    >
      <div class="text-center m-10 mt-20 md:mt-32">
        <h2 class="header">
          {{ row.label }}
        </h2>
      </div>
      <div class="shadow-lg bg-white border">
        <div class="flex border-b">
          <div class="px-4 py-2 border-r flex items-center">
            <h3 class="text-blue-600 font-bold">
              {{ row.level }}
            </h3>
          </div>
          <div class="p-4 font-semibold">
            {{ row.value }}
          </div>
        </div>
        <textarea
          v-model="row.summary"
          class="w-full h-64 p-4 outline-none"
          placeholder="Napisz podsumowanie..."
        />
      </div>
    </div>
  </div>
</template>

<script>
import { API, KEY } from '@/utils';

export default {
  data() {
    return {
      data: [],
      summary: '',
    }
  },
  methods: {
    isDone(done, level) {
      const border = level > 0 ? ' border-l-0' : '';
      if (done === 'TRUE') {
        return `text-white bg-blue-${ level + 6 }00 border-blue-${ level + 5 }00` + border;
      }
      return 'bg-white' + border;
    },
    apply() {
      /**
       * Sample JavaScript code for sheets.spreadsheets.values.append
       * See instructions for running APIs Explorer code samples locally:
       * https://developers.google.com/explorer-help/guides/code_samples#javascript
       */

        function authenticate() {
          return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/spreadsheets"})
            .then(function() { console.log("Sign-in successful"); },
                  function(err) { console.error("Error signing in", err); });
        }
        function loadClient() {
          gapi.client.setApiKey("AIzaSyAtgGjAz3Vk3wFJmoRPYuuRCEwRZpeFy0g");
          return gapi.client.load("https://sheets.googleapis.com/$discovery/rest?version=v4")
              .then(function() { console.log("GAPI client loaded for API"); },
                    function(err) { console.error("Error loading GAPI client for API", err); });
        }
        // Make sure the client is loaded and sign-in is complete before calling this method.

        const values = this.data.map(e => Object.values(e))

        console.log(values)
        const execute = () => {
          return gapi.client.sheets.spreadsheets.values.append({
            "spreadsheetId": "1K5-AgiFoHDXqq7qsT_sBFjdMp2zPhJzZWAzGAUEcJN8",
            "range": "PODSUMOWANIE",
            "valueInputOption": "RAW",
            "resource": {
              values,
            }
          })
              .then(function(response) {
                      // Handle the results here (response.result has the parsed body).
                      console.log("Response", response);
                    },
                    function(err) { console.error("Execute error", err); });
        }
        gapi.load("client:auth2", function() {
          gapi.auth2.init({client_id: "524244998138-jv54a5o5nrl1ka1l1sp19f4t97t8gj8l.apps.googleusercontent.com"});
        });

        // authenticate().then(loadClient)
        execute()
    }
  },
  mounted() {
    try {
      const sheeID = atob(this.$route.params.id);
      if (!sheeID.includes('/values/')) {
        throw 'Wrong URL';
      }
      fetch(`${ API }${ sheeID }${ atob(KEY) }`)
        .then(res => res.json())
        .then(res => {
          const data = []
          // remove first row with header
          res.values.shift();
          res.values
            .filter(e => e.length)
            .map(e => {
              let level = 0
              let value = ''
              const label = e.shift()
              for (let i = 0; i < e.length - 1 && value === ''; i += 3) {
                if (e[i] === 'FALSE') {
                  value = e[i + 1];
                  level = (i / 3) + 1;
                }
              }
              if (value != '') {
                data.push({
                  label,
                  level,
                  value,
                  summary: 'eeeellllooooo',
                })
              }
            });
          this.data = data;
        })
        .catch(err => console.error(err))
    } catch {
      alert('Nieprawidłowy adres URL!');
      return this.$router.push('/');
    }
  },
}
</script>