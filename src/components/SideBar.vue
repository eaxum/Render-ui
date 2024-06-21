<template>
  <div class="container">
    <div :class="{ sidebar: true, blurred: addJob }">
      <aside>
        <div class="logo">
          <img
            class="icons-logo"
            src="./../assets/aizen.png"
            alt="Quality Icon" />
        </div>
        <div class="menu">
          <router-link class="button" to="/" exact-active-class="active">
            <span class="quality action-column">
              <img
                class="icons"
                src="./../assets/jobs.png"
                alt="Quality Icon" />
            </span>
            <!-- <p class="job-text">jobs</p> -->
          </router-link>
          <router-link class="button" to="/worker" exact-active-class="active">
            <span class="quality action-column">
              <img
                class="icons"
                src="./../assets/nodes.png"
                alt="Quality Icon" />
            </span>
            <!-- <p class="node-text">workers</p> -->
          </router-link>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.blurred {
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.shot-text {
  background-color: transparent;
  font-size: 12pt;
  font-weight: 600;
  color: black;
  opacity: 0.8;
  margin-bottom: 7rem;
  margin-left: 2rem;
  visibility: hidden;
  position: absolute;
  transition: 0.2s ease;
}

.job-text {
  background-color: transparent;
  font-size: 12pt;
  font-weight: 600;
  color: black;
  opacity: 0.8;
  margin-bottom: 7rem;
  margin-left: 0.9rem;
  visibility: hidden;
  position: absolute;
  transition: 0.2s ease;
}
.node-text {
  background-color: transparent;
  font-size: 12pt;
  font-weight: 600;
  color: black;
  opacity: 0.8;
  margin-bottom: 7rem;
  margin-left: 0.6rem;
  visibility: hidden;
  position: absolute;
  transition: 0.2s ease;
}

.quality.action-column:hover .shot-text {
  visibility: visible;
}
.container {
  overflow: auto;
}
aside {
  display: flex;
  flex-direction: column;
  min-height: 94vh;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  overflow: hidden;
  padding: 1rem;
  background-color: #41435f;
  transition: 0.2s ease-out;
}

.flex {
  flex: 1;
}

.logo .icons-logo {
  width: 4.5rem;
  background-color: transparent;
  border-radius: 20px;
  position: relative;
  margin-bottom: 7rem;
  transition: 0.2s ease;
}
.icons {
  width: 3rem;
  padding: 0.7rem;
  background: linear-gradient(
    to bottom,
    #476191,
    #76359e
  ); /* Gradient from top to bottom with a touch of purple */
  border-radius: 20px;
}

.icons:hover {
  background: linear-gradient(
    to bottom,
    #7c94be,
    #804f9e
  ); /* Gradient from top to bottom with a touch of purple */
  transition: 0.2s ease;
}

.logo img {
  width: 2rem;
}
.quality.action-column {
  position: relative;

  /* Position the text relative to the parent */
}

.text {
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  margin-left: 50px; /* Add margin */
  padding: 5px; /* Add padding */
  display: none; /* Initially hide the text */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden;
}

.quality.action-column:hover .text {
  display: inline;
}

.menu {
  margin: 0 -1rem;
}

.button {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  margin-bottom: 7px;
  transition: 0.2s ease;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.button .material-icons {
  font-style: 2rem;
  color: white;
  transition: 0.2s ease-out;
}

.router-link-active .icons {
  background: linear-gradient(to bottom, #7998d3, #9c5ac5);
  color: white;
}

.is-expanded {
  width: 3.7rem;
}

.setting-text {
  color: white;
}

@media screen and (max-width: 768px) {
  .icons,
  .icons-logo {
    width: 2.5rem;
  }

  .logo .icons-logo {
    margin-bottom: 5rem;
  }

  .button {
    padding: 0.3rem 0.7rem;
    margin-bottom: 5px;
  }
}
</style>
