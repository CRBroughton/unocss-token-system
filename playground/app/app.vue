<script setup lang="ts">
const theme = useColorMode()

const themes = ['light', 'dark', 'forest', 'ocean']

function setTheme(selectedTheme: string) {
  theme.preference = selectedTheme
}
</script>

<template>
  <div class="p-lg">
    <div class="inline-block relative">
      <select
        class="py-sm px-md rounded-sm border-normal bg-primary text-secondary"
        :value="theme.value"
        @change="setTheme(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="t in themes" :key="t" :value="t">
          {{ t }}
        </option>
      </select>
    </div>

    <!-- Spacing Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Spacing
      </h2>
      <div class="flex gap-md">
        <div class="p-xss bg-primary">
          xss padding
        </div>
        <div class="p-xs bg-primary">
          xs padding
        </div>
        <div class="p-sm bg-primary">
          sm padding
        </div>
        <div class="p-md bg-primary">
          md padding
        </div>
        <div class="p-lg bg-primary">
          lg padding
        </div>
        <div class="p-xl bg-primary">
          xl padding
        </div>
      </div>
    </section>

    <!-- Border Radius Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Border Radius
      </h2>
      <div class="flex gap-md">
        <div class="p-md rounded-sm bg-primary">
          sm
        </div>
        <div class="p-md rounded-md bg-primary">
          md
        </div>
        <div class="p-md rounded-lg bg-primary">
          lg
        </div>
        <div class="p-md rounded-xl bg-primary">
          xl
        </div>
        <div class="p-md rounded-full bg-primary">
          full
        </div>
      </div>
    </section>

    <!-- Sizes Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Sizes
      </h2>
      <div class="flex flex-col gap-md">
        <div class="h-xss bg-primary">
          h-xss
        </div>
        <div class="h-xs bg-primary">
          h-xs
        </div>
        <div class="h-sm bg-primary">
          h-sm
        </div>
        <div class="h-md bg-primary">
          h-md
        </div>
        <div class="h-lg bg-primary">
          h-lg
        </div>
        <div class="h-xl bg-primary">
          h-xl
        </div>
      </div>
    </section>

    <!-- Flex Layout Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Flex Layout
      </h2>
      <div class="flex flex-wrap gap-md">
        <div class="flex justify-center items-center p-md rounded-md bg-primary">
          centered content
        </div>
        <div class="flex flex-col gap-sm p-md rounded-md bg-primary">
          <span>column</span>
          <span>layout</span>
        </div>
      </div>
    </section>

    <!-- Grid Layout Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Grid Layout
      </h2>
      <div class="grid grid-cols-3 gap-md">
        <div class="p-md rounded-md bg-primary">
          1
        </div>
        <div class="p-md rounded-md bg-primary">
          2
        </div>
        <div class="p-md rounded-md bg-primary">
          3
        </div>
        <div class="col-span-2 p-md rounded-md bg-primary">
          4 (span 2)
        </div>
        <div class="p-md rounded-md bg-primary">
          5
        </div>
      </div>
    </section>

    <!-- Border Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Borders
      </h2>
      <div class="flex gap-md">
        <div class="p-md rounded-md border-thin border-solid border-primary">
          thin border
        </div>
        <div class="p-md rounded-md border-normal border-dashed border-primary">
          normal dashed
        </div>
        <div class="p-md rounded-md border-thick border-dotted border-primary">
          thick dotted
        </div>
      </div>
    </section>

    <!-- Typography Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Typography
      </h2>
      <div class="flex flex-col gap-md">
        <p class="font-sans text-lg font-bold">
          Sans Bold Large
        </p>
        <p class="font-serif text-md font-normal">
          Serif Normal Medium
        </p>
        <p class="font-mono text-sm font-light">
          Mono Light Small
        </p>
      </div>
    </section>

    <!-- Effects Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Effects
      </h2>
      <div class="flex gap-md">
        <div class="p-md rounded-md shadow-sm bg-primary">
          Shadow SM
        </div>
        <div class="p-md rounded-md shadow-md bg-primary">
          Shadow MD
        </div>
        <div class="p-md rounded-md shadow-lg bg-primary">
          Shadow LG
        </div>
      </div>
    </section>

    <!-- State Variants Showcase -->
    <section>
      <h2 class="mb-md text-text">
        State Variants
      </h2>
      <div class="flex gap-md">
        <button class="hover:scale-105 p-md rounded-md bg-primary hover:(bg-secondary)">
          Hover Me
        </button>
        <button class="p-md rounded-md bg-primary active:bg-secondary">
          Click Me
        </button>
        <button class="focus:ring-2 p-md rounded-md bg-primary focus:(bg-secondary)">
          Focus Me
        </button>
      </div>
    </section>

    <!-- Interactivity Showcase -->
    <section>
      <h2 class="mb-md text-text">
        Interactivity
      </h2>

      <!-- Cursors -->
      <div class="flex flex-wrap mb-md gap-md">
        <div class="cursor-pointer p-md rounded-md bg-primary">
          cursor-pointer
        </div>
        <div class="cursor-not-allowed p-md rounded-md bg-primary">
          cursor-not-allowed
        </div>
        <div class="cursor-grab p-md rounded-md bg-primary">
          cursor-grab
        </div>
        <div class="cursor-text p-md rounded-md bg-primary">
          cursor-text
        </div>
        <div class="cursor-move p-md rounded-md bg-primary">
          cursor-move
        </div>
        <div class="cursor-help p-md rounded-md bg-primary">
          cursor-help
        </div>
      </div>

      <!-- User Select -->
      <div class="flex flex-wrap gap-md">
        <div class="select-none p-md rounded-md bg-primary">
          Can't select this text
        </div>
        <div class="select-text p-md rounded-md bg-primary">
          Can select this text
        </div>
        <div class="select-all p-md rounded-md bg-primary">
          Selects all at once
        </div>
      </div>
    </section>
  </div>
</template>
