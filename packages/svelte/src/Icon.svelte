<script lang="ts">
  export let size: number | string = 24;
  export let attrs: Record<string, string> = {};
  export let body: string = "";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  aria-hidden="true"
  focusable="false"
  {...attrs}
  {...$$restProps}
>
  {@html body}
</svg>
