(function () {
  const config = window.JAMI_CONFIG || {};
  const year = new Date().getFullYear();

  document.querySelectorAll("[data-current-year]").forEach(el => {
    el.textContent = year;
  });

  document.querySelectorAll("[data-program-name]").forEach(el => {
    el.textContent = config.programName || "JaMi Protect";
  });

  document.querySelectorAll("[data-version-label]").forEach(el => {
    el.textContent = config.versionLabel || "Preview";
  });

  document.querySelectorAll("[data-repo-url]").forEach(el => {
    el.href = config.repoUrl || "#";
  });

  document.querySelectorAll("[data-releases-url]").forEach(el => {
    el.href = config.releasesUrl || "#";
  });

  document.querySelectorAll("[data-latest-release-url]").forEach(el => {
    el.href = config.latestReleaseUrl || "#";
  });

  document.querySelectorAll("[data-direct-installer-url]").forEach(el => {
    el.href = config.directInstallerUrl || "#";
  });

  document.querySelectorAll("[data-download-button]").forEach(btn => {
    if (!config.releaseReady) {
      btn.href = "download.html";
      btn.removeAttribute("download");
      btn.querySelector("[data-download-label]")?.replaceChildren(
        document.createTextNode("Download page")
      );
    }
  });

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-links");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const reveal = () => {
    document.querySelectorAll(".reveal").forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) el.classList.add("visible");
    });
  };
  reveal();
  document.addEventListener("scroll", reveal, { passive: true });
})();