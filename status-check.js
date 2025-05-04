function checkLocalSystemStatus() {
  const mainStatus = localStorage.getItem("status_main-server");
  if (mainStatus && mainStatus.toLowerCase() === "offline") {
    if (!location.pathname.includes("system-offline.html")) {
      window.location.href = "/system-offline.html";
    }
  }
}

setInterval(checkLocalSystemStatus, 5000);
