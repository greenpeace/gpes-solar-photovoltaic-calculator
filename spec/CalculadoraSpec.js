/* eslint-disable no-undef */
/* jshint esversion:6 */

let t1 = new Calculadora(6800, 100, "Cádiz", "Este");
let t2 = new Calculadora(6800, 100, "Cádiz", "Norte");

// INPUTS

describe("Asegurarse que los inputs son validos", () => {

    it("El importe de la factura de la luz debe ser un número entero positivo", () => {
        expect(function () { t1.consumo_anual = -12; }).toThrow();
        expect(function () { t1.consumo_anual = "A"; }).toThrow();
    });

    it("Asumir el valor para consumo anual a partir del primer parámetro", () => {
        expect(t1.consumo_anual).toBe(6800);
    });

    it("Porcentaje tiene que ser un número entero entre 0 y 100", () => {
        expect(function () { t1.porcentaje_consumo = -5; }).toThrow();
        expect(function () { t1.porcentaje_consumo = -1; }).toThrow();
        expect(function () { t1.porcentaje_consumo = 101; }).toThrow();
        expect(function () { t1.porcentaje_consumo = "Z"; }).toThrow();
    });

    it("Asumir el valor para porcentaje del consumo a partir del segundo parámetro", () => {
        expect(t1.porcentaje_consumo).toBe(100);
    });

    it("Provincia tiene que ser válida", () => {
        expect(function () { t1.provincia = "España"; }).toThrow();
    });

    it("Asumir el valor para provincia a partir del tercer parámetro", () => {
        expect(t1.provincia).toBe("Cádiz");
    });

    it("Orientación tiene que ser válida", () => {
        expect(function () { t1.orientacion_tejado = "O"; }).toThrow();
    });

    it("Asumir el valor para orientacion tejado a partir del cuarto parámetro", () => {
        expect(t1.orientacion_tejado).toBe("Este");
    });

});

// VARIABLES

describe("Zona climática", () => {

    it("Valor zona climática", () => {
        expect(t1.valor_zona_climatica()).toBe(1754);
    });

});

describe("Zona climática de la provincia", () => {

    it("Valor zona climática de una provincia", () => {
        expect(t1.zona_climatica_de_provincia()).toBe('IV');
    });

});

describe("Coeficiente orientación del tejado", () => {

    it("Ejemplo sur", () => {
        expect(t1.coeficiente_orientacion_tejado()).toBe(0.83);
        expect(t2.coeficiente_orientacion_tejado()).toBe(0);
    });

});

// OUTPUTS

describe("Energia a cubrir (kWh/year)", () => {

    it("Cálculo de energía a cubrir", () => {
        expect(t1.energia_a_cubrir()).toBe(6800);
    });

});

describe("Potencia necesaria de tu instalacion  para cubrir el consumo deseado (kWp)", () => {

    it("Potencia necesaria de tu instalacion  para cubrir el consumo deseado (kWp)", () => {
        expect(t1.potencia_necesaria_para_consumo_deseado()).toBeCloseTo(4.67, 2);
        expect(t2.potencia_necesaria_para_consumo_deseado()).toBe(0);
    });

});

describe("Nº de paneles a instalar", () => {

    it("Nº de paneles a instalar", () => {
        expect(t1.numero_paneles_a_instalar()).toBe(10);
        expect(t2.numero_paneles_a_instalar()).toBe(0);
    });

});

describe("Coste de tu instalacion (€) (aproximado)", () => {

    it("Coste de tu instalacion (€) (aproximado)", () => {
        expect(t1.coste_de_tu_instalacion()).toBe(7941);
        expect(t2.coste_de_tu_instalacion()).toBe(0);
    });

});

describe("Ahorro anual esperado (€)", () => {

    it("Ahorro anual esperado", () => {
        expect(t1.ahorro_anual_esperado()).toBe(802);
        expect(t2.ahorro_anual_esperado()).toBe(0);
    });

});

describe("Años de amortizacion", () => {

    it("Años de amortizacion", () => {
        expect(t1.anos_amortizacion()).toBe(9.9);
        expect(t2.anos_amortizacion()).toBe(0);
    });

});

describe("Emissiones", () => {

    it("Emissiones", () => {
        expect(t1.emissiones()).toBe(1088);
        expect(t2.emissiones()).toBe(0);
    });

});
