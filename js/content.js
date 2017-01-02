// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.message === "highlight_text") {
//       chrome.runtime.sendMessage({message: "save_text", text: getSelection()})
//     }
//   }
// );
//
// function getSelection() {
//   return selectedText = window.getSelection().toString();
//   console.log(`Saving the text: "${ selectedText }"`);
// }
