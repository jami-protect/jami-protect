/* JaMi Protect production build: V6.7 CLEAN RESCUE */
window.JAMI_CONFIG = {
  programName: "JaMi Protect",
  githubOwner: "jami-protect",
  githubRepo: "jami-protect",
  installerFileName: "JaMiProtect_Setup.exe",
  versionLabel: "Preview",
  releaseReady: false,
  pagesUrl: "https://jami-protect.github.io/jami-protect/",
  githubUrl: "https://github.com/jami-protect/jami-protect"
};
(function(){
 const c=window.JAMI_CONFIG;
 c.repoUrl=`https://github.com/${c.githubOwner}/${c.githubRepo}`;
 c.releasesUrl=`${c.repoUrl}/releases`;
 c.latestReleaseUrl=`${c.releasesUrl}/latest`;
 c.directInstallerUrl=`${c.latestReleaseUrl}/download/${c.installerFileName}`;
})();