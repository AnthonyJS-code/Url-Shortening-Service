const genBtn = document.getElementById("gen");
const urlC = document.getElementById("url");
const customCode = document.getElementById("CC");
const shortUrl = document.getElementById("sUrl");
const copyModal = document.getElementById("copy");
const copyM = document.getElementById("copyM");

genBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (urlC.value === "") {
    urlC.focus();
  } else {
    data = { lurl: urlC.value, CC: customCode.value };
    res = await fetch("/api/shortener", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    header = res.headers.get("Content-type");
    if (header === "text/html; charset=utf-8") {
      location.href = res.url;
    } else {
      receivedData = await res.json();
      if (res.status === 400) {
        copyM.innerText = receivedData.warning;
        copyModal.showModal();
        setTimeout(close, 1000);
      } else {
        shortUrl.value = receivedData.u;
      }
    }
  }
});

shortUrl.addEventListener("click", async () => {
  if (!navigator.clipboard) {
    copyM.innerText = "Nope, Rejected";
    copyModal.showModal();
    setTimeout(close, 1000);
  } else {
    if (shortUrl.value === "") {
      copyM.innerText = "Generate Short URL First";
      copyModal.showModal();
      setTimeout(close, 1000);
    } else {
      await navigator.clipboard.writeText(shortUrl.value);
      copyM.innerText = "Copied";
      copyModal.showModal();
      setTimeout(close, 1000);
    }
  }
});

function close() {
  copyModal.close();
}
