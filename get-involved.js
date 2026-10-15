/* =========================================================
   SHARE OUR MISSION
   ========================================================= */

const shareUrl = window.location.href;

const shareText =
    "Support Young Leaders Foundation and help us create brighter opportunities for children.";


/* WhatsApp */

const whatsappShare = document.querySelector(".whatsapp-share");

if (whatsappShare) {
    whatsappShare.href =
        `https://wa.me/?text=${encodeURIComponent(
            shareText + " " + shareUrl
        )}`;
}


/* Facebook */

const facebookShare = document.querySelector(".facebook-share");

if (facebookShare) {
    facebookShare.href =
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
        )}`;
}


/* X */

const xShare = document.querySelector(".x-share");

if (xShare) {
    xShare.href =
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
}


/* LinkedIn */

const linkedinShare = document.querySelector(".linkedin-share");

if (linkedinShare) {
    linkedinShare.href =
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
        )}`;
}


/* Copy Link */

const copyLink = document.querySelector(".copy-link");

if (copyLink) {

    copyLink.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(shareUrl);

            copyLink.innerHTML =
                '<i class="fas fa-check"></i> Link Copied!';

            setTimeout(() => {

                copyLink.innerHTML =
                    '<i class="fas fa-link"></i> Copy Link';

            }, 2000);

        } catch (error) {

            alert("Unable to copy the link. Please copy it manually.");

        }

    });

}