<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style scoped>
.spinner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
