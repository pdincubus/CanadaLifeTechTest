export default class LifeInsuranceCalculator {
    constructor (
        containElem = document.getElementById('life-ins-calc'),
        formElem = containElem.querySelector('form'),
        valueElem = document.getElementById('calculated-value')
    ) {
        if (!containElem || !valueElem || !formElem) {
            console.log('LifeInsuranceCalculator exiting. Container:', containElem, 'Value:', valueElem, 'Form:', formElem);

            return;
        }

        this.container = containElem;
        this.valueElem = valueElem;
        this.formElem = formElem;

        this.ageElem = this.formElem.querySelector('#age');
        this.termElem = this.formElem.querySelector('#term-length');
        this.smokeElems = this.formElem.querySelectorAll('.field--radios input');
        this.coverElem = this.formElem.querySelector('#cover-amount');
        this.coverValueElem = this.formElem.querySelector('#cover-value');

        this.init();
    }

    init () {
        this._addEventListeners();
    }

    _addEventListeners () {
        this.ageElem.addEventListener('change', e => {
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

    _formatMoney (value, decimalPlaces = 0) {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        }).format(value);
    }

    _getFormData () {
        return new FormData(this.formElem);
    }

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

    _updatePremiumValue (value) {
        this.valueElem.innerHTML = this._formatMoney(value, 2);
    }
}