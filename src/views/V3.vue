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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 shadow-lg">
        <div
          v-for="(col, j) in row.value"
          class="flex align-center border"
          :class="isDone(col.done, j)"
          :key="j">
          <div
            :class="col.done === 'TRUE' ? `text-white border-blue-${ j + 5 }00` : 'text-blue-600'"
            class="w-16 flex-shrink-0 flex-grow-0 flex-center border-r p-4 md:pt-6">
            <h1
              class="md:text-5xl font-bold">
              {{ j + 1 }}
            </h1>
          </div>
          <div class="text-sm md:text-lg font-medium p-4 md:p-6 flex flex-col justify-between">
            <div class="mb-4">
              {{ col.goal }}
            </div>
            <div class="md:text-xl">
              <div v-if="col.done === 'TRUE'">
                 🚀 {{ col.date }}
              </div>
              <div v-else>
                 🎯 {{ col.date }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="row.inspiration" class="bg-white md:col-span-3 border flex">
          <div class="p-4 border-r">
            💎 Inspiracje
          </div>
          <div class="p-4">
            {{ row.inspiration }}
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
  methods: {
    isDone(done, level) {
      const border = level > 0 ? ' border-l-0' : '';
      if (done === 'TRUE') {
        return `text-white bg-blue-${ level + 6 }00 border-blue-${ level + 5 }00` + border;
      }
      return 'bg-white' + border;
    },
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
              const value = []
              const label = e.shift()
              const inspiration = e.pop()
              for (let i = 0; i < e.length - 1; i += 3) {
                value.push({
                  done: e[i],
                  goal: e[i + 1],
                  date: e[i + 2],
                });
              }
              data.push({
                label,
                value,
                inspiration,
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
