<template>
  <div class="markdown-body">
    <markdown></markdown>
  </div>
</template>

<script>
import markdown from './markdown.md'
import 'highlight.js/styles/github.css'
import 'github-markdown-css'

export default {
  components: {
    markdown
  }
}
</script>
