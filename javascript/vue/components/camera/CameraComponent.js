import template from './CameraComponent.html';

export default {
    template: template,

    data() {
        return {
            enabled: false,
            video: null,
        };
    },

    mounted() {
        this.bootModule();
    },

    methods: {
        bootModule() {
            if (navigator.mediaDevices.getUserMedia) {
                this.enabled = true;

                // Request the camera.
                navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: "user",
                        // width: 480,
                        // height: 368
                    }
                })
                    .then(this.processStream)
                    .catch(this.handleError);
            }
        },

        processStream(mediaStream) {
            this.video = document.getElementById('camera-stream');

            try {
                this.video.srcObject = mediaStream;
            } catch (error) {
                this.video.src = URL.createObjectURL(mediaStream);
            }

            setTimeout(() => {
                this.video.srcObject = null;
                this.enabled = false;
            }, 3000);
        },

        handleError(err) {
            this.enabled = false;

            console.log(err);
        },
    },
}
