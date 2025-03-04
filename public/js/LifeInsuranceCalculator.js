/**
 * LifeInsuranceCalculator calculates and updates the life insurance premium based on form data.
 *
 * @class
 */
export default class LifeInsuranceCalculator {
    /**
     * Creates an instance of LifeInsuranceCalculator.
     *
     * @param {HTMLElement} [containElem=document.getElementById('life-ins-calc')] - The container element for the calculator.
     * @param {HTMLFormElement} [formElem=containElem.querySelector('form')] - The form element within the container.
     * @param {HTMLElement} [valueElem=document.getElementById('calculated-value')] - The element where the calculated premium is displayed.
   */
    constructor (
        containElem = document.getElementById('life-ins-calc'),
        formElem = containElem.querySelector('form'),
        valueElem = document.getElementById('calculated-value')
    ) {
        if (!containElem || !valueElem || !formElem) {
            console.log('LifeInsuranceCalculator exiting. Container:', containElem, 'Value:', valueElem, 'Form:', formElem);

            return;
        }

        /** @type {HTMLElement} */
        this.container = containElem;
        /** @type {HTMLElement} */
        this.valueElem = valueElem;
        /** @type {HTMLFormElement} */
        this.formElem = formElem;

        /** @type {HTMLInputElement} */
        this.ageElem = this.formElem.querySelector('#age');
        /** @type {HTMLSelectElement} */
        this.termElem = this.formElem.querySelector('#term-length');
        /** @type {NodeListOf<HTMLInputElement>} */
        this.smokeElems = this.formElem.querySelectorAll('.field--radios input');
        /** @type {HTMLInputElement} */
        this.coverElem = this.formElem.querySelector('#cover-amount');
        /** @type {HTMLElement} */
        this.coverValueElem = this.formElem.querySelector('#cover-value');

        this.init();
    }

    /**
     * Initializes the calculator by adding event listeners.
     *
     * @private
     */
    init () {
        this._addEventListeners();
    }

    /**
     * Adds event listeners to form elements to update the premium dynamically.
     *
     * @private
     */
    _addEventListeners () {
        this.ageElem.addEventListener('change', e => {
            if (!this.ageElem.checkValidity()) {
                return false;
            }

            const newPremium = this._calculatePremium();

            this._updatePremiumValue(newPremium);
        });

        this.termElem.addEventListener('change', e => {
            const newPremium = this._calculatePremium();

            this._updatePremiumValue(newPremium);
        });

        this.smokeElems.forEach(elem => {
            elem.addEventListener('click', e => {
                const newPremium = this._calculatePremium();

                this._updatePremiumValue(newPremium);
            });
        });

        this.coverElem.addEventListener('change', e => {
            const currentValue = e.currentTarget.value;
            const moneyValue = this._formatMoney(currentValue);
            const newPremium = this._calculatePremium();

            this.coverValueElem.innerHTML = moneyValue;
            this._updatePremiumValue(newPremium);
        });
    }

    /**
     * Formats a numeric value as currency.
     *
     * @param {number|string} value - The value to format.
     * @param {number} [decimalPlaces=0] - The number of decimal places to display.
     * @returns {string} The formatted currency string.
     * @private
     */
    _formatMoney (value, decimalPlaces = 0) {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }).format(value);
    }

    /**
     * Retrieves form data from the calculator form.
     *
     * @returns {FormData} The form data.
     * @private
     */
    _getFormData () {
        return new FormData(this.formElem);
    }

    /**
     * Calculates the insurance premium based on form input values.
     *
     * Calculation details:
     * - Minimum premium: £5.
     * - Age penalty: £0.5 per year above 18.
     * - Cover penalty: £1 for every £50,000 of cover (after the base level).
     * - Smoker penalty: Multiplies the premium by 1.2 if the user is a smoker.
     * - Term multiplier: Multiplies the premium based on the term length:
     *   - 5 years: 1.0,
     *   - 10 years: 1.1,
     *   - 15 years: 1.2,
     *   - 20 years: 1.3.
     *
     * @returns {number} The calculated premium.
     * @private
     */
    _calculatePremium () {
        const formData = this._getFormData();

        const minPremium = 5; // £

        const yearPenaltyAmount = 0.5; // £
        const yearPenaltyStart = 18; // Years

        const coverPenaltyAmount = 1; // £
        const coverPenaltyStep = 50000; // £

        const smokerPenaltyPercent = 1.2;

        const yearPenaltyFactors = {
            '5': 1,
            '10': 1.1,
            '15': 1.2,
            '20': 1.3
        } // Multiplier

        const age = parseInt(formData.get('age'), 10);
        const term = parseInt(formData.get('term-length'), 10);
        const smoker = (formData.get('smoker') === 'yes') ? true : false;
        const cover = parseInt(formData.get('cover-amount'), 10);

        const yearsPenalty = (age - yearPenaltyStart);
        const yearsPenaltyTotal = yearsPenalty * yearPenaltyAmount;

        const coverLevelPenalty = (cover / coverPenaltyStep) * coverPenaltyAmount - 1;

        let newPremium = minPremium + yearsPenaltyTotal + coverLevelPenalty;

        if (smoker) {
            newPremium = newPremium * smokerPenaltyPercent;
        }

        newPremium = newPremium * yearPenaltyFactors[term];

        return newPremium;
    }

    /**
     * Updates the premium value displayed in the DOM.
     *
     * @param {number} value - The new premium value.
     * @private
     */
    _updatePremiumValue (value) {
        this.valueElem.innerHTML = this._formatMoney(value, 2);
    }
}