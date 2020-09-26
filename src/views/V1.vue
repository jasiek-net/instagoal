<template>
  <div class="container mb-24">
    <div
      v-for="(row, i) in data"
      :key="i">
      <div class="text-center m-10 mt-20 md:mt-32">
        <h2 class="header">
          {{ row.label }}
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-lg bg-white">
        <div
          v-for="(col, j) in row.value"
          class="flex align-center border-b"
          :key="j">
          <div class="w-16 flex-shrink-0 flex-grow-0 flex-center border-r border-l p-4 md:pt-6">
            <h1 class="md:text-5xl text-blue-600 font-bold">
              {{ j + 1 }}
            </h1>
          </div>
          <div class="text-sm md:text-lg font-medium p-4 md:p-6">
            {{ col }}
          </div>
        </div>
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
          res.values
            .filter(e => e.length)
            .map(e => {
              data.push({
                label: e.shift(),
                value: e,
              })
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
