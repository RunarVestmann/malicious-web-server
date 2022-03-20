const downloadFileViaHiddenHyperLink = (filename) => {
  const a = document.createElement("a");
  a.setAttribute("href", `http://localhost:4000/${filename}`);
  a.setAttribute("download", filename);

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const downloadFileViaFetch = (filename) => {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", (e) => {
    const isDownloadFinished = request.readyState == 4;
    if (!isDownloadFinished) return;
    console.log(request.response);
    console.log(URL.createObjectURL(request.response));
  });

  request.responseType = "blob";
  request.open("get", filename);
  request.send();
};

function download(filename, text) {
  const fileBlob = new Blob([text], { type: "application/octet-binary" });
  const url = URL.createObjectURL(fileBlob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);

  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    link.dispatchEvent(event);
  } else {
    link.click();
  }

  // Deallocate resources
  if (URL.revokeObjectURL) URL.revokeObjectURL(url);
}

function open(options = {}) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");

    if (options.multiple) input.setAttribute("multiple", "");

    if (options.accept) input.setAttribute("accept", options.accept);

    input.setAttribute("type", "file");
    input.style.display = "none";

    input.addEventListener("change", (ev) => {
      if (input.files.length) {
        if (options.multiple) resolve(input.files);
        else resolve(input.files[0]);
      } else {
        reject(ev);
      }
      input.remove();
    });

    document.body.appendChild(input);
    input.click();
  });
}

// window.addEventListener('')

// // downloadFileViaFetch("test.txt");
// downloadFileViaHiddenHyperLink("test.exe");
