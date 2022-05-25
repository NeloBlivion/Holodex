<template>
  <!-- Render with opaque response for cache if size is lte 40 -->
  <a
    v-if="!err"
    :href="!noLink && `/channel/${channel.id}`"
    :title=" channel.name +
      (channel.english_name ? `\nEN: ${channel.english_name}` : '') +
      (channel.org ? `\n> ${channel.org}` : '') +
      (channel.group ? `\n> ${channel.group}` : '') "
    @click.exact.prevent="goToChannel"
  >
    <v-lazy
      tag="img"
      :src="photo"
      crossorigin="anonymous"
      loading="lazy"
      :width="size"
      :height="size"
      class="d-block"
      :class="rounded && 'rounded-circle'"
      @error="err = true"
    />
  </a>
  <v-avatar
    v-else
    color="secondary"
    :width="size"
    :height="size"
    :title="channel.name"
    style="min-width: 0px"
  >
    <v-icon>
      <!-- {{ icons.mdiAccountCircleOutline }}  --> 
      <!-- MIGRATION NOTES: Remove ICON TEMPORARILY -->
    </v-icon>
  </v-avatar>
</template>

<script lang="ts">
import { getChannelPhoto } from "@/utils/functions"; // MIGRATION NOTES: Converted the Function call to Typescript

export default defineComponent({ // MIGRATION NOTES: wrap the {} in defineComponent
    name: "ChannelImg",
    props: {
        channel: {
            type: Object,
            required: true,
        },
        size: {
            type: [String, Number],
            default: 40,
        },
        noLink: {
            type: Boolean,
            default: false,
        },
        noAlt: {
            type: Boolean,
            default: false,
        },
        rounded: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            err: false,
        };
    },
    computed: {
        photo() {
            return getChannelPhoto(this.channel.id, +this.size); // MIGRATION NOTES: this.size => +this.size since size is string|number and we cast it to number.
        },
    },
    methods: {
        goToChannel(e: { stopImmediatePropagation: () => void; }) { // MIGRATION NOTES: automatically inferred type of 'e'.
            if (this.noLink) return;
            e.stopImmediatePropagation();
            this.$router.push({ path: `/channel/${this.channel.id}` });
        },
    },
});
</script>

<style scoped>
img:hover {
    cursor: pointer;
}
</style>
