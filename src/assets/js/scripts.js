import Animation from "./modules/ClassAnimation";


class App {
    constructor() {
        this.init();
    }
    animations(){
        /**
         * Animation Widget
         */
        const widgetAnimation = new Animation(
            document.querySelector('.widgets-animation'),
            { rootMargin: "0px", threshold: 0 },
            Array.from(document.querySelector('.widgets-animation').querySelectorAll('.widget'))
        )
        widgetAnimation.checkVisible().catch(e => this.errors(e))

        /**
         * Animation Rows Feature
         */
        const rowsAnimation = new Animation(
            document.querySelector('.rows-animation'),
            { rootMargin: "0px", threshold: 0 },
            Array.from(document.querySelector('.rows-animation').querySelectorAll('.row-feat'))
        )
        rowsAnimation.checkVisible().catch(e => this.errors(e))

        /**
         * Footer Animation
         */
        const footerAnimation = new Animation(
            document.querySelector('.footer-animation'),
            { rootMargin: "0px", threshold: 0 },
            Array.from(document.querySelector('.footer-animation').querySelectorAll('.footer-item-animation'))
        )
        footerAnimation.checkVisible().catch(e => this.errors(e))

    }
    errors(error){
        console.error(error);
    }
    init(){
        this.animations();
    }
}

new App();









