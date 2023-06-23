


function validateNumbers() {
    const phoneNumbers = [];
    const textarea = document.getElementById("input-text");
    const textarea1 = document.getElementById("output-text");
    if (textarea && textarea1) {
      const lines = textarea.value.split(/\r?\n/);
      let output = "";
      for (const line of lines) {
        const number = line.trim();
        if (number !== "") {
          phoneNumbers.push(number);
          output += number.replace("\n", " ") + "\n";
        }
      }
      textarea1.textContent = output.trimRight();
    }
  

    if (phoneNumbers.length > 0) {
      openWhatsApp()
        .then(() => {
          console.log("Validation completed.");
        })
        .catch((error) => {
          console.log("An error occurred during validation:", error);
        });
    } else {
      console.log("No phone numbers entered.");
    }
  }

  openWhatsApp();