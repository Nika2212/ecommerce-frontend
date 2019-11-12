class DropdownModule {
    /**
     * Constructor Arguments
     * @param {string} config.targetID - Toggle element identifier
     * @param {string} config.childID - Hidden element identifier.
     * @param {string} config.className - CSS Classname that appends to target element when child is expanded.
     */
    constructor(config) {
        this.config = config || {};

        this.dropdownTargetReference = null;
        this.dropdownChildReference = null;
        this.eventHandler = null;

        this.__validateInputs();
    }
    expand = () => {
        this.dropdownChildReference.classList.remove('d-none');
        this.dropdownTargetReference.classList.add('expanded');
        document.body.addEventListener('click', this.eventHandler, true);
    };
    collapse = () => {
        this.dropdownChildReference.classList.add('d-none');
        this.dropdownTargetReference.classList.remove('expanded');
        document.body.removeEventListener('click', this.eventHandler, true);
    };
    __validateInputs = () => {
        if (Object.keys(this.config).length < 2) {
            console.error('FATAL ERROR: Config object requires at least 2 properties [string targetID, string childID]');
        } else {
            try {
                this.dropdownTargetReference = document.getElementById(this.config.targetID);
                this.dropdownChildReference = document.getElementById(this.config.childID);
                if (!this.dropdownTargetReference || !this.dropdownChildReference) throw new Error();
                this.__handleEvents();
            } catch (error) {
                console.error("FATAL ERROR: Can't get DOM References");
            }
        }
    };
    __handleEvents = () => {
        this.eventHandler = this.__onBlur.bind(this);
        this.dropdownTargetReference.addEventListener('click', this.__onToggle.bind(this), true);
        this.dropdownChildReference.addEventListener('click', (e) => e.stopPropagation(), true);
    };
    __onToggle = () => {
        if (this.dropdownChildReference.className.search('d-none') > -1) {
            this.expand();
        } else {
            this.collapse();
        }
    };
    __onBlur = (event) => {
        if (!this.dropdownChildReference.contains(event.target) && event.target !== this.dropdownTargetReference) {
            this.collapse();
        }
    };
}

const sampleDropdown = new DropdownModule({targetID : 'target-id', childID : 'child-id', className : 'expanded'});
