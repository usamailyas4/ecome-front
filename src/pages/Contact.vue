<template>
    <div class="flex items-center justify-center p-4 md:p-16">
        <div class="max-w-3xl w-full text-center bg-white shadow-lg rounded-2xl p-10">
            <h1 class="text-secondary mb-4">Contact Us</h1>
            <p class="text-normal mb-8">We’d love to hear from you! Get in touch through any of the ways below.</p>

            <div class="space-y-6">
                <div>
                    <h4 class="text-normal">📧 Email</h4>
                    <a href="mailto:hello@example.com" class="text-normal hover:underline text-sm">hello@example.com</a>
                </div>

                <div>
                    <h4 class="text-normal">📞 Phone</h4>
                    <a href="tel:+1234567890" class="text-normal hover:underline text-sm">+1 (234) 567‑890</a>
                </div>

                <div>
                    <h4 class="text-normal">📍 Address</h4>
                    <p class="text-sm text-normal">123 Main Street, Karachi, Pakistan</p>
                </div>

                <div class="flex justify-center gap-4 pt-4">
                    <a href="#" class="p-3 bg-light rounded-full hover:bg-secondary" aria-label="Twitter">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <polygon fill="#616161" points="41,6 9.929,42 6.215,42 37.287,6"></polygon><polygon fill="#000" fill-rule="evenodd" points="31.143,41 7.82,7 16.777,7 40.1,41" clip-rule="evenodd"></polygon><path fill="#616161" d="M15.724,9l20.578,30h-4.106L11.618,9H15.724 M17.304,6H5.922l24.694,36h11.382L17.304,6L17.304,6z"></path>
                        </svg>
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-normal" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92a8.2 8.2 0 0 1-2.36.65 4.12 4.12 0 0 0 1.8-2.27 8.22 8.22 0 0 1-2.6.99A4.11 4.11 0 0 0 12.07 9.6a11.66 11.66 0 0 1-8.46-4.29 4.11 4.11 0 0 0 1.27 5.48 4.07 4.07 0 0 1-1.86-.51v.05a4.11 4.11 0 0 0 3.29 4.03 4.13 4.13 0 0 1-1.85.07 4.12 4.12 0 0 0 3.84 2.85A8.25 8.25 0 0 1 2 19.54a11.63 11.63 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.34 8.34 0 0 0 22 5.92z"/></svg> -->
                    </a>
                    <a href="#" class="p-3 bg-light rounded-full hover:bg-secondary" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-normal" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.6v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.86v5.49h-3.6V9h3.46v1.56h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.41 4.33 5.54v6.7zM5.34 7.43a2.09 2.09 0 1 1 .01-4.18 2.09 2.09 0 0 1-.01 4.18zM7.14 20.45H3.53V9h3.61v11.45z"/></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default{
    name: "Contact"
}
</script>