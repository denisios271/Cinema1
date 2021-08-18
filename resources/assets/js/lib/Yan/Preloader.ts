export default class Preloader {
    nodeVideoContainer = null;
    documentInitializedTime = 0;

    constructor(documentInitializedTime: number) {
        this.documentInitializedTime = documentInitializedTime;
        this.initialize();
    }

    static start(documentInitializedTime: number): Preloader {
        let preloader = new Preloader(documentInitializedTime);
        preloader.show();
        return preloader;
    }

    initialize(): void {
        let timer = setInterval(() => {
            let container = document.querySelector('.pre-loader__img-cont');
            let video = ($('video.pre-loader__img')[0] as HTMLVideoElement);
            if (container != null) {
                this.nodeVideoContainer = container;
                clearInterval(timer);
                setTimeout(() => {
                    $('.pre-loader').animate({ opacity: '0' }, 400, 'swing', () => {
                        $('.pre-loader').hide();
                        video.pause();
                    });
                }, 3000);
            }
        }, 50);
    }

    show(): void {
        let video = ($('video.pre-loader__img')[0] as HTMLVideoElement);
        video.style.opacity = '1';
        video.play();

        setTimeout(() => {
            $('.pre-loader').animate({ opacity: '0' }, 400, 'swing', () => {
                $('.pre-loader').hide();
                video.pause();
            });
        }, 3000);
    }

    beginHidingIfCanBackgroundLoop(): void {
        let wastedTimeAfterInitialization = performance.now() - this.documentInitializedTime; //in ms

        setTimeout(() => {
            if (wastedTimeAfterInitialization > 2056) {
                $('.pre-loader').hide();
            } else if ($('.pre-loader').is(":visible")) {
                this.beginHidingIfCanBackgroundLoop();
            } else {
                // do nothing
                // video had an error and didn't close
                // or page didn't load in 3 secs
                // so we don't want to waste user time on preloader
            }
        }, 50)
    }
}