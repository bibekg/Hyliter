chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message == "success") {
      const html = `<div id="success_msg">
                      <p>Hylited!</p>
                    </div>`

      // Render success message on content page
      $("body").append(html);
      $("#success_msg").animate({top: '0px'}, 600);

      // Remove message after some time
      setTimeout(function() {
        $("#success_msg").animate({top: '-500px'}, 600, function() {
          document.getElementById('success_msg').parentNode
            .removeChild(document.getElementById('success_msg'));
        });
      }, 2500);
    }
  });
