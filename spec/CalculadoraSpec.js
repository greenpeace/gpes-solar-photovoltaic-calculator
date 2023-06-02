/* eslint-disable no-undef */
/* jshint esversion:6 */

let t1 = new Calculadora(5000, 80, "Almería", "S");

describe("Asegurarse que los inputs son validos", () => {

    it("El importe de la factura de la luz debe ser un número entero positivo", () => {
        expect(function () { t1.consumo_anual = -12; }).toThrow();
        expect(function () { t1.consumo_anual = "A"; }).toThrow();
    });

    it("Asumir el valor para consumo anual a partir del primer parámetro", () => {
        expect(t1.consumo_anual).toBe(5000);
    });

    it("Porcentaje tiene que ser un número entero entre 0 y 100", () => {
        expect(function () { t1.porcentaje_consumo = -5; }).toThrow();
        expect(function () { t1.porcentaje_consumo = -1; }).toThrow();
        expect(function () { t1.porcentaje_consumo = 101; }).toThrow();
        expect(function () { t1.porcentaje_consumo = "Z"; }).toThrow();
    });

    it("Asumir el valor para porcentaje del consumo a partir del segundo parámetro", () => {
        expect(t1.porcentaje_consumo).toBe(80);
    });

    it("Provincia tiene que ser válida", () => {
        expect(function () { t1.provincia = "España"; }).toThrow();
    });

    it("Asumir el valor para CCAA a partir del tercer parámetro", () => {
        expect(t1.provincia).toBe("Almería");
    });

    it("Orientación tiene que ser válida", () => {
        expect(function () { t1.orientacion_tejado = "O"; }).toThrow();
    });

    it("Asumir el valor para orientacion tejado a partir del cuarto parámetro", () => {
        expect(t1.orientacion_tejado).toBe("S");
    });

});

describe("Energia a cubrir", () => {

    it("Cálculo de energía a cubrir", () => {
        expect(t1.energia_a_cubrir()).toBe(4000);
    });

});

describe("Producción de un pannel", () => {

    it("Producción de un pannel, média nacional", () => {
        expect(t1.produccion_de_un_panel()).toBe(1500);
    });

});

describe("Potencia necesaria a instalar(kWp)", () => {

    it("Potencia necesaria a instalar(kWp)", () => {
        expect(t1.potencia_necesaria_a_instalar()).toBeCloseTo(2.67, 1);
    });

});

describe("Coste de instalación", () => {

    it("Coste de instalación", () => {
        expect(t1.coste_de_instalacion()).toBe(4800);
    });

});


describe("Ahorro anual esperado", () => {

    it("Ahorro anual esperado", () => {
        expect(t1.ahorro_anual_esperado()).toBe(800);
    });

});


describe("Años de amortizacion", () => {

    it("Años de amortizacion", () => {
        expect(t1.anos_amortizacion()).toBe(6);
    });

});
