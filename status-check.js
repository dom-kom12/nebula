function checkLocalSystemStatus() {
  const mainStatus = (localStorage.getItem("status_main-server") || "").toLowerCase();

  console.log("Status serwera głównego:", mainStatus); // do debugowania

  if (mainStatus === "offline") {
    if (!location.pathname.includes("system-offline.html")) {
      window.location.href = "/system-offline.html";
    }
  }
}

setInterval(checkLocalSystemStatus, 5000);
