/* jshint esversion:6 */

describe("Asegurarse que los inputs son validos", () => {

    it("El importe de la factura de la luz debe ser un número entero positivo", () => {
        expect(function() { calc.consumo_anual = -12; }).toThrow();
        expect(function() { calc.consumo_anual = "A"; }).toThrow();
    });

    it("Porcentaje tiene que ser un número entero entre 0 y 100", () => {
        expect(function() { calc.porcentaje_consumo = -5; }).toThrow();
        expect(function() { calc.porcentaje_consumo = -1; }).toThrow();
        expect(function() { calc.porcentaje_consumo = 101; }).toThrow();
        expect(function() { calc.porcentaje_consumo = "Z"; }).toThrow();
    });

    it("CCA tiene que ser válida", () => {
        expect(function() { calc.comunidad_autonoma = "España"; }).toThrow();
    });

    it("Orientación tiene que ser válida", () => {
        expect(function() { calc.orientacion_tejado = "O"; }).toThrow();
    });

});

describe("Energia a cubrir", () => {

    it("Cálculo de energía a cubrir", ()=> {
        calc.consumo_anual = 5000;
        calc.porcentaje_consumo = 80;
        expect(calc.energia_a_cubrir()).toBe(4000);
    });

});

describe("Producción de un pannel", () => {

    it("Producción de un pannel, média nacional", ()=> {
        expect(calc.produccion_de_un_panel()).toBe(1500);
    });

});

describe("Potencia necesaria a instalar(kWp)", () => {

    it("Potencia necesaria a instalar(kWp)", ()=> {
        expect(calc.potencia_necesaria_a_instalar()).toBeCloseTo(2.67,1);
    });

});

describe("Coste de instalación", () => {

    it("Coste de instalación", ()=> {
        expect(calc.coste_de_instalacion()).toBe(4800);
    });

});


describe("Ahorro anual esperado", () => {

    it("Ahorro anual esperado", ()=> {
        expect(calc.ahorro_anual_esperado()).toBe(800);
    });

});


describe("Años de amortizacion", () => {

    it("Años de amortizacion", ()=> {
        expect(calc.anos_amortizacion()).toBe(6);
    });

});