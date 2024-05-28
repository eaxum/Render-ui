<template>
  <div class="container">
    <aside>
      <div class="logo">
        <img
          class="icons-logo"
          src="./../assets/aizen.png"
          alt="Quality Icon" />
      </div>

      <div class="menu">
        <router-link
          class="button"
          to="/"
          @mouseover="showJobText(true)"
          @mouseleave="showJobText(false)">
          <span class="quality action-column">
            <img class="icons" src="./../assets/jobs.png" alt="Quality Icon" />
          </span>
          <!-- <p class="job-text">jobs</p> -->
        </router-link>

        <router-link
          class="button"
          to="about"
          @mouseover="showNodeText(true)"
          @mouseleave="showNodeText(false)">
          <span class="quality action-column">
            <img class="icons" src="./../assets/nodes.png" alt="Quality Icon" />
          </span>
          <!-- <p class="node-text">workers</p> -->
        </router-link>
      </div>
    </aside>
  </div>
</template>

<script setup>
const showShotText = (isHovering) => {
  const shotText = document.querySelector('.shot-text');
  shotText.style.visibility = isHovering ? 'visible' : 'hidden';
};
const showJobText = (isHovering) => {
  const jobText = document.querySelector('.job-text');
  jobText.style.visibility = isHovering ? 'visible' : 'hidden';
};
const showNodeText = (isHovering) => {
  const nodeText = document.querySelector('.node-text');
  nodeText.style.visibility = isHovering ? 'visible' : 'hidden';
};
</script>

<style scoped>
/*.shot-text {
      background-color: #cecbcb;
      border-radius: 10px;
      padding: 20px;
      margin-left: 5rem;
      font-weight: 700;
      font-size: 16pt;
      visibility: hidden;
      cursor:pointer;
      position: absolute;
      z-index: 1111;
    }
    */
.shot-text {
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
  min-height: 92vh;
  margin-top: 10px;
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
  overflow: hidden; /* Hide overflowing text */
}

.quality.action-column:hover .text {
  display: inline; /* Display the text when hovering */
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
  border-radius: 5px; /* Add border-radius for rounded corners */
  transition: background-color 0.3s ease; /* Add transition for background color */
}

.button .material-icons {
  font-style: 2rem;
  color: white;
  transition: 0.2s ease-out;
}

/*.button:hover,
    .router-link-active.button {
      background-color: blue;
    }
    */

.router-link-active.button {
  border-right: 5px solid var(--primary);
}

.is-expanded {
  width: 3.7rem;
}

.setting-text {
  color: white;
}

@media (max-width: 768px) {
  aside {
    position: fixed;
    z-index: 99;
  }
}
</style>
