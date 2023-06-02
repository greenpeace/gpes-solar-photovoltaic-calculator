/* eslint-disable no-undef */
/* jshint esversion:6 */

let t1 = new Calculadora(6800, 100, "Cádiz", "Este");

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

    it("Validación zonas climáticas", () => {
        expect(function () { t1.valor_zona_climatica('Zona I'); }).toThrow();
    });

    it("Valor zona climática", () => {
        expect(t1.valor_zona_climatica('IV')).toBe(1754);
    });

});

describe("Zona climática de la provincia", () => {

    it("Valor zona climática de una provincia", () => {
        expect(t1.zona_climatica_de_provincia('Cádiz')).toBe('IV');
    });

});

describe("Coeficiente orientación del tejado", () => {

    it("Ejemplo sur", () => {
        expect(t1.coeficiente_orientacion_tejado()).toBe(0.83);
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
    });

});

describe("nº de paneles a instalar", () => {

    it("nº de paneles a instalar", () => {
        
    });

});

describe("Coste de tu instalacion (€) (aproximado)", () => {

    it("Coste de instalación", () => {
        
    });

});


describe("Ahorro anual esperado (€)", () => {

    it("Ahorro anual esperado", () => {
        
    });

});


describe("Años de amortizacion", () => {

    it("Años de amortizacion", () => {
        
    });

});


describe("Emissiones", () => {

    it("Emissiones", () => {
        
    });

});