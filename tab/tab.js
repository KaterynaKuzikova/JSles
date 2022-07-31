class Tab{
    #titles = [];
    #bodies = [];
    #activeIndx = 0;
    static CLASSES = {
        active:"title-active",
        ttl_cont: "title-container",
        shown:"shown",
        title:"title",
        body:"body",
    };
    constructor(el){
        this.init(el);
    }
    
    init(el){
        this.setElements(el);
        this.initialClassesSet(el);
        el.children[0].addEventListener("click", this.onTabSwitch);
    }

    setElements(el){
        this.#titles = [...el.children[0].children];
        this.#bodies = [...el.children[1].children];
    }

    initialClassesSet(el){
        this.setActiveClasses(this.#titles, Tab.CLASSES.active, Tab.CLASSES.title);
        this.setActiveClasses(this.#bodies, Tab.CLASSES.shown, Tab.CLASSES.body);
        el.children[0].classList.add(Tab.CLASSES.ttl_cont);
    }

    onTabSwitch(e){
        this.#activeIndx = this.#titles.indexOf(e.target);
        this.renderElem();
    }

    renderElem(){
        this.iterElem(this.#titles, Tab.CLASSES.active);
        this.iterElem(this.#bodies, Tab.CLASSES.shown);
    }

    setActiveClasses(elements, activeClass, normalClass){
        elements.forEach((e,i) => {
            e.classList.add(normalClass);
            if(i === this.#activeIndx) {
                e.classList.add(activeClass);
            }
        });
    }

    iterElem(elements, elClass){
        elements.forEach((e,i) => {
            if(i === this.#activeIndx) {
                e.classList.add(elClass);
            }else{
                e.classList.remove(elClass);
            }
        });
    }
}