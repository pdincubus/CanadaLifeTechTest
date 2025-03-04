import LifeInsuranceCalculator from './LifeInsuranceCalculator.js';

const lifeInsCalcContainer = document.getElementById('life-ins-calc');

if (lifeInsCalcContainer) {
    const lifeInsuranceCalculator = new LifeInsuranceCalculator(lifeInsCalcContainer);
}