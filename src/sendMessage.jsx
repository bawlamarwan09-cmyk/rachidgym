export function sendMessage(phone, msg, imageUrl = null) {
  const encodedMsg = encodeURIComponent(msg);
  let url = `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;

  if (imageUrl) {
    url += `%0A${encodeURIComponent(imageUrl)}`;
  }

  const existingTab = localStorage.getItem("wa_tab");

  if (existingTab) {
    window.open(url, existingTab);
  } else {
    const newTab = window.open(url, "_blank");
    if (newTab) {
      localStorage.setItem("wa_tab", newTab.name);
    }
  }
}
