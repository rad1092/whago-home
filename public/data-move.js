/* global Blob, URL, document, window */

const products = {
  Daymark: {
    destination: "https://daymark.whago.net/",
    files: [
      ["daymark:data:v2", "daymark-backup-v2.json", "현재 백업"],
      ["daymark:data:backup:v2", "daymark-backup-v2-previous.json", "직전 정상 백업"],
      ["daymark:data:v1", "daymark-backup-v1.json", "이전 버전 백업"],
      ["daymark:data:backup", "daymark-backup-v1-previous.json", "이전 버전 정상 백업"],
      [
        "daymark:data:backup:v1",
        "daymark-backup-v1-compat.json",
        "이전 호환 백업",
      ],
    ],
  },
  Siteboard: {
    destination: "https://siteboard.whago.net/",
    files: [
      ["siteboard.document.v2", "siteboard-work-v2.json", "현재 작업 파일"],
      [
        "siteboard.document.backup.v2",
        "siteboard-work-v2-previous.json",
        "직전 정상 작업 파일",
      ],
      [
        "siteboard.document.recovery.raw",
        "siteboard-recovery-raw.txt",
        "복구용 원본",
        "text/plain;charset=utf-8",
      ],
      ["siteboard.document.v1", "siteboard-work-v1.json", "이전 버전 작업 파일"],
      [
        "siteboard.document.backup.v1",
        "siteboard-work-v1-previous.json",
        "이전 버전 정상 작업 파일",
      ],
    ],
  },
};

const productName = document.body.dataset.product;
const product = products[productName];
const list = document.querySelector("#backup-list");
const count = document.querySelector("#backup-count");
const destination = document.querySelector(".destination");

if (product && list && count && destination) {
  destination.href = product.destination;
  let found = 0;

  for (
    const [key, filename, label, mimeType = "application/json"] of product.files
  ) {
    const value = window.localStorage.getItem(key);
    if (!value) continue;
    found += 1;

    const button = document.createElement("button");
    button.className = "backup-button";
    button.type = "button";
    button.innerHTML = `<span>${label}</span><span aria-hidden="true">↓</span>`;
    button.addEventListener("click", () => {
      const blob = new Blob([value], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    });
    list.append(button);
  }

  count.textContent = `${found}개`;
  if (found === 0) {
    const message = document.createElement("p");
    message.className = "empty";
    message.textContent =
      "이 브라우저에서 찾은 기존 자료 0개 · 새 주소를 바로 열어 시작할 수 있습니다.";
    list.append(message);
  }
}
