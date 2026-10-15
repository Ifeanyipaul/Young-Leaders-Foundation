
const forms = document.querySelectorAll(
    ".contact-form, .volunteer-form, .partnership-form"
);

forms.forEach(function (form) {
    const wrapper = form.parentElement;

    // Reuse existing messages or create them for this form.
    let successMessage = wrapper.querySelector(".form-success");
    let errorMessage = wrapper.querySelector(".form-error");

    if (!successMessage) {
        successMessage = document.createElement("div");
        successMessage.className = "form-success";
        successMessage.setAttribute("role", "status");
        successMessage.setAttribute("aria-live", "polite");
        successMessage.hidden = true;
        form.before(successMessage);
    }

    if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.className = "form-error";
        errorMessage.setAttribute("role", "alert");
        errorMessage.hidden = true;
        form.before(errorMessage);
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = form.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalButtonHTML = submitButton
            ? submitButton.innerHTML
            : "";

        const originalButtonValue = submitButton?.value;

        if (submitButton) {
            submitButton.disabled = true;

            if (submitButton.tagName === "BUTTON") {
                submitButton.textContent = "Sending...";
            } else {
                submitButton.value = "Sending...";
            }
        }

        successMessage.hidden = true;
        errorMessage.hidden = true;

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            // Clear all fields after successful submission.
            form.reset();

            // Show the appropriate success message.
            if (form.matches(".volunteer-form")) {
                successMessage.textContent =
                    "Thank you for your interest in volunteering! Your application has been submitted successfully.";
            } else if (form.matches(".partnership-form")) {
                successMessage.textContent =
                    "Thank you for your interest in partnering with us! Your inquiry has been submitted successfully.";
            } else {
                successMessage.textContent =
                    "Your message has been sent successfully! Thank you for contacting us.";
            }

            successMessage.hidden = false;

      // Scroll to the success message after submission.
     setTimeout(() => {
        successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
       });
       }, 100);

        } catch (error) {
            errorMessage.textContent =
                "Your submission could not be sent. Please check your internet connection and try again.";

            errorMessage.hidden = false;

        } finally {
            if (submitButton) {
                submitButton.disabled = false;

                if (submitButton.tagName === "BUTTON") {
                    submitButton.innerHTML = originalButtonHTML;
                } else {
                    submitButton.value = originalButtonValue;
                }
            }
        }
    });
});
