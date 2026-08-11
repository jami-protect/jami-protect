window.JAMI_CONFIG = {
  programName: "JaMi Protect",
  githubOwner: "timmiejtwitch-sketch",
  githubRepo: "Jamiprotect",
  installerFileName: "JaMiProtect_Setup.exe",
  versionLabel: "Preview",
  releaseReady: false,
  supportEmail: "",
  websiteName: "JaMi Protect",
  tagline: "Research-backed Windows gaming optimization."
};

(function () {
  const c = window.JAMI_CONFIG;
  c.repoUrl = `https://github.com/${c.githubOwner}/${c.githubRepo}`;
  c.releasesUrl = `${c.repoUrl}/releases`;
  c.latestReleaseUrl = `${c.releasesUrl}/latest`;
  c.directInstallerUrl = `${c.latestReleaseUrl}/download/${c.installerFileName}`;
  c.pagesUrl = `https://${c.githubOwner}.github.io/${c.githubRepo}/`;
})();