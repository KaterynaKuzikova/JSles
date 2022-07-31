class Menu {
    #menu = [];
    #hamb = [];
    static CLASSES = {        
        dsctp_list_cont: "dsctp_list-container",
        hidden_hamb: "hidden-hamb",
        items:"items",

        mob_list_cont: "mob_list-container",
        show_hamb: "mob-hamb",         
        hambElement: "menu_span",   
        active: "active",  
        mob_items:"mob-items",   
        hover: "hover"  
    };

    constructor (el, options = { eventType: "mouseover" }){   
        this.options = options; 
        if (document.documentElement.clientWidth <= 768) {                  
        this.initMobile(el);        
        } else {
            this.initDesktop(el); 
        }
    };


    initDesktop(el){        
        this.setElementsDesktop(el);        
        this.initialClassSetDesktop(el); 
        // console.log(el)
    }; 

    setElementsDesktop(el) {
        this.#menu = [...el.children[1].children];        
    };

    initialClassSetDesktop(el){
        this.setClassesItemsDesktop(this.#menu, Menu.CLASSES.items);     
        el.children[1].classList.add(Menu.CLASSES.dsctp_list_cont);
        el.children[0].classList.add(Menu.CLASSES.hidden_hamb);        
    };

    setClassesItemsDesktop(elements, ClassItem) {
        elements.forEach((e) => {
            e.classList.add(ClassItem);            
        });
    };     



    
    initMobile(el){        
        this.setElementsMobile(el);
        this.initialClassSetMobile(el);
        this.addListeners(el);     
            
    };
    setElementsMobile(el){
        this.#hamb = [...el.children[0].children];  
        this.#menu = [...el.children[1].children];       
    }
    initialClassSetMobile(el){            
        this.setClassesHamburger(this.#hamb, Menu.CLASSES.hambElement);         
        el.children[0].classList.add(Menu.CLASSES.show_hamb); 
        el.children[1].classList.add(Menu.CLASSES.mob_list_cont);
        this.setClassesItemsMobile(this.#menu, Menu.CLASSES.mob_items); 
    }   
    setClassesHamburger(el, ClassE) {
        el.forEach((e) => {
            e.classList.add(ClassE);             
        });
    };   
    setClassesItemsMobile(elements, ClassIt) {
        elements.forEach((e) => {
            e.classList.add(ClassIt);            
        });
    };  

    addListeners(el) {
        el.addEventListener("click", this.onMenuClick);
        el.addEventListener("touchstart", this.onMenuHover);        
    }
    onMenuClick = (e) => {
        const target = e.target;        
        if(e.target.classList.contains(Menu.CLASSES.show_hamb) ||
           e.target.classList.contains(Menu.CLASSES.hambElement)) {
            setTimeout(function(){
            el.children[1].classList.toggle(Menu.CLASSES.active);             
            }, 300);
        }
        if(e.target.classList.contains(Menu.CLASSES.mob_items)) {
            setTimeout(function(){
                el.children[1].classList.remove(Menu.CLASSES.active); 
                el.children[0].classList.remove(Menu.CLASSES.hover);                 
            }, 300);
        }              
    }

    onMenuHover = (e) => {
        const target = e.target; 
        if(e.target.classList.contains(Menu.CLASSES.show_hamb) ||
           e.target.classList.contains(Menu.CLASSES.hambElement)) {
            el.children[0].classList.add(Menu.CLASSES.hover);                            
        }
        if(e.target.classList.contains(Menu.CLASSES.mob_items)) {
            this.setClassesItemsHover(this.#menu, Menu.CLASSES.hover);
        }        
    }
    setClassesItemsHover(elements, ClassIt) {
        elements.forEach((e) => {
            e.classList.remove(ClassIt); 
        });  
        event.target.classList.add(ClassIt);
    }     
        
}

    


   


   
