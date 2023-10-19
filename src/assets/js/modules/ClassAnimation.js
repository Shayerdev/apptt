class Animation {
    /**
     *
     * @param section
     * @param { object : { rootMargin: string, threshold: number | number[] } } option
     * @param { HTMLElement[] } elements
     */
    constructor(section, option = {}, elements) {
        this.section = section;
        this.option = option;
        this.elements = elements
    }

    async animationElements(){
        if (!!this.elements.length) {
            for (const element of this.elements) {
                await new Promise((res) => setTimeout(res, 200));
                element.classList.add('animation-init');
            }
        }else {
            throw 'Elements for animation not found';
        }
    }

    checkVisible(){

        return new Promise((res, rej) => {
            try{
                if(!this.section)
                    throw 'Element not found, select other element';

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.map(entry => {
                        if(entry.isIntersecting)
                            this.animationElements().catch(e=> {
                                throw e
                            })
                    })
                }, {
                    ...this.option,
                    root: null
                });
                observer.observe(this.section);
            } catch (e){
                throw e;
            }
        })
    }
}

export default Animation;