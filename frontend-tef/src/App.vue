<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Menu</RouterLink>
        <RouterLink to="/pedidos">Pedidos</RouterLink>
        <RouterLink to="/usuarios">Clientes</RouterLink>
        <RouterLink to="/archivos">Archivos</RouterLink>
        <RouterLink to="/productos">Productos</RouterLink>
        <RouterLink to="/about">Soporte</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  position: sticky;   /* opcional: que quede arriba */
  top: 0;
  z-index: 10;
  background: rgb(34, 81, 251);  /* o var(--color-background) */
  line-height: 1.5;
}

.wrapper {
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  max-width: 1200px;
}

nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 0;
  padding: 0.5rem 0;
}

nav a {
  display: inline-flex;
  padding: 0.5rem 0.75rem;
  border-left: 0;
  text-decoration: none;
  border-radius: 8px;
}

/* activo */
nav a.router-link-exact-active {
  font-weight: 1800;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
