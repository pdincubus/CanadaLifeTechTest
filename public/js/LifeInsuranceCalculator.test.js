/**
* @jest-environment jsdom
*/
import LifeInsuranceCalculator from './LifeInsuranceCalculator.js';

describe('LifeInsuranceCalculator DOM interactions', () => {
    let container, form, calculatedValue, coverValue, instance;
    let ageInput, termSelect, smokerNo, smokerYes, coverInput;

    beforeEach(() => {
        document.body.innerHTML = `
            <div id="life-ins-calc">
                <form>
                    <input type="number" id="age" name="age" value="30">

                    <select id="term-length" name="term-length">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>

                    <div class="field--radios">
                        <input type="radio" name="smoker" value="no" checked>
                        <input type="radio" name="smoker" value="yes">
                    </div>

                    <input type="number" id="cover-amount" name="cover-amount" value="100000">

                    <div id="cover-value"></div>
                </form>
            </div>

            <div id="calculated-value"></div>
        `;

        container = document.getElementById('life-ins-calc');
        form = container.querySelector('form');
        calculatedValue = document.getElementById('calculated-value');
        coverValue = document.getElementById('cover-value');

        ageInput = document.getElementById('age');
        termSelect = document.getElementById('term-length');
        smokerNo = form.querySelector('input[name="smoker"][value="no"]');
        smokerYes = form.querySelector('input[name="smoker"][value="yes"]');
        coverInput = document.getElementById('cover-amount');

        // Instantiate the calculator, which attaches event listeners.
        instance = new LifeInsuranceCalculator();
    });

    test('should initialise correctly when all elements are present', () => {
        expect(instance.container).toBe(container);
        expect(instance.formElem).toBe(form);
        expect(instance.valueElem).toBe(calculatedValue);
    });

    test('should calculate premium correctly', () => {
        // For the initial values:
        // age = 30, term = 5, smoker = no, cover = 100000
        // Calculation:
        // yearsPenalty = 30 - 18 = 12; yearsPenaltyTotal = 12 * 0.5 = 6
        // coverLevelPenalty = (100000 / 50000) * 1 - 1 = 1
        // base premium = 5 (minPremium) + 6 + 1 = 12
        // Multiplier for term '5' is 1, so expected premium = 12.
        const premium = instance._calculatePremium();

        expect(premium).toBeCloseTo(12, 2);
    });

    test('should update premium value in the DOM on age change', () => {
        // Change age from 30 to 40.
        ageInput.value = '40';
        ageInput.dispatchEvent(new Event('change', { bubbles: true }));

        // Calculation:
        // Age penalty: (40 - 18) * 0.5 = 22 * 0.5 = 11.
        // Base premium = 5 (min) + 11 (age penalty) + 1 (cover penalty for 100,000) = 17.
        // Term multiplier for 5 is 1 and smoker is no.
        // Expected premium = 17.
        expect(calculatedValue.innerHTML).toMatch(/£\s?17\.00/);
    });

    test('should update premium value in the DOM on term-length change', () => {
        // Change term from default 5 to 10.
        termSelect.value = '10';
        termSelect.dispatchEvent(new Event('change', { bubbles: true }));

        // Calculation with default values:
        // Age penalty: (30 - 18) * 0.5 = 12 * 0.5 = 6.
        // Base premium = 5 + 6 + 1 = 12.
        // Term multiplier for '10' is 1.1.
        // Expected premium = 12 * 1.1 = 13.2.
        expect(calculatedValue.innerHTML).toMatch(/£\s?13\.20/);
    });

    test('should update premium value in the DOM on smoker change', () => {
        // Simulate clicking the smoker 'yes' radio.
        smokerYes.checked = true;
        smokerYes.dispatchEvent(new Event('click', { bubbles: true }));

        // Calculation with default values:
        // Age penalty: (30 - 18) * 0.5 = 12 * 0.5 = 6.
        // Base premium = 5 + 6 + 1 = 12.
        // If smoker, multiply premium by 1.2: 12 * 1.2 = 14.4.
        // Term multiplier for 5 is 1, so expected premium = 14.4.
        expect(calculatedValue.innerHTML).toMatch(/£\s?14\.40/);
    });

    test('should update premium value in the DOM on cover-amount change', () => {
        // Change cover amount from 100,000 to 150,000.
        coverInput.value = '150000';
        coverInput.dispatchEvent(new Event('change', { bubbles: true }));

        // Calculation with default values:
        // Age penalty: (30 - 18) * 0.5 = 12 * 0.5 = 6.
        // Cover penalty: (150000 / 50000) * 1 - 1 = 3 - 1 = 2.
        // Base premium = 5 + 6 + 2 = 13.
        // Term multiplier for 5 is 1 and smoker is no, so expected premium = 13.
        expect(calculatedValue.innerHTML).toMatch(/£\s?13\.00/);
    });
});