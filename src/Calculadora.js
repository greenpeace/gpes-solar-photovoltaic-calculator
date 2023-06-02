/* jshint esversion:6 */

class Calculadora {

    /**
     * Crea una instancia de la Calculadora
     * @constructor
     * @param {number} consumo_anual
     * @param {number} porcentaje_consumo
     * @param {string} provincia
     * @param {string} orientacion_tejado
     */
    constructor(consumo_anual, porcentaje_consumo, provincia, orientacion_tejado) {
        this.consumo_anual = consumo_anual;
        this.porcentaje_consumo = porcentaje_consumo;
        this.provincia = provincia;
        this.orientacion_tejado = orientacion_tejado;
        this.coste_por_kWp = 1800;
        this.ahorro_p_kWh = 0.2;
    }

    /**
     * Consumo anual en KWH
     * @type {number} Número entero
     */
    set consumo_anual(n) {
        n = parseInt(n);
        if (isNaN(n) || n < 0) {
            throw new Error("El consumo anual tiene que ser un número entero positivo");
        }
        this._consumo_anual = n;
    }
    get consumo_anual() {
        return this._consumo_anual;
    }

    /**
     * Porcentage del comsumo de 0 a 100
     * @type {number} Número entero
     */
    set porcentaje_consumo(n) {
        n = parseInt(n);
        if (isNaN(n) || n < 0 || n > 100) {
            throw new Error("El porcentaje del consumo tiene que ser un número entre 0 y 100");
        }
        this._porcentaje_consumo = n;
    }
    get porcentaje_consumo() {
        return this._porcentaje_consumo;
    }

    /**
     * Comunidad autonoma
     * @type {string} 
     */
    set provincia(s) {
        const lista_de_provincias = [
            'Almería',
            'Cádiz',
            'Córdoba',
            'Granada',
            'Huelva',
            'Jaén',
            'Málaga',
            'Sevilla',
            'Huesca',
            'Teruel',
            'Zaragoza',
            'Asturias',
            'Cantabria',
            'Barcelona',
            'Girona',
            'Lleida',
            'Tarragona',
            'Albacete',
            'Ciudad Real',
            'Cuenca',
            'Guadalajara',
            'Toledo',
            'Ávila',
            'Burgos',
            'León',
            'Palencia',
            'Salamanca',
            'Segovia',
            'Soria',
            'Valladolid',
            'Zamora',
            'Madrid',
            'Alicante',
            'Castellón',
            'Valencia',
            'Badajoz',
            'Cáceres',
            'A Coruña',
            'Lugo',
            'Ourense',
            'Pontevedra',
            'Mallorca',
            'Menorca',
            'Tenerife',
            'Lanzarote',
            'La Palma',
            'La Rioja',
            'Murcia',
            'Álava',
            'Guipúzcoa',
            'Vizcaya',
            'Ceuta',
            'Melilla',
            'Navarra',
        ];
        if (!lista_de_provincias.includes(s)) {
            throw new Error("Provincia inválida o error ortográfico");
        }
        this._provincia = s;
    }
    get provincia() {
        return this._provincia;
    }

    valor_zona_climatica(zona){
        if (!['I', 'II', 'III', 'IV', 'V'].includes(zona)) {
            throw new Error("Zona climática invalida");
        }
        const tabla_valores ={
            I : 1100,
            II: 1460,
            III: 1607,
            IV: 1754,
            V: 1825
        };
        return tabla_valores[zona];
    }

    /**
     * Orientación del tejado
     * @type {string} 
     */
    set orientacion_tejado(s) {
        if (!['Norte', 'Sur', 'Este', 'Oeste', 'Plano'].includes(s)) {
            throw new Error("Orientación tejado inválida o error ortográfico");
        }
        this._orientacion_tejado = s;
    }
    get orientacion_tejado() {
        return this._orientacion_tejado;
    }

    /**
     * Porcentage de energía a producir por renovables KWH
     * @returns {number}
     */
    energia_a_cubrir() {
        return this.consumo_anual * this.porcentaje_consumo / 100;
    }

    // TODO Media nacional o por CCAA
    /**
     * Producción de un pannel
     * @returns {number}
     */
    produccion_de_un_panel() {
        return 1500;
    }

    /**
     * Potencia necesaria a instalar(kWp)
     * @returns {number}
     */
    potencia_necesaria_a_instalar() {
        return this.energia_a_cubrir() / this.produccion_de_un_panel();
    }

    /**
     * Coste de instalacion (€)
     * @returns {number}
     */
    coste_de_instalacion() {
        return this.potencia_necesaria_a_instalar() * this.coste_por_kWp;
    }

    /**
     * Ahorro anual esperado €
     * @returns {number}
     */
    ahorro_anual_esperado() {
        return this.energia_a_cubrir() * this.ahorro_p_kWh;
    }

    /**
     * Años de amortizacion
     * @returns {number}
     */
    anos_amortizacion() {
        return this.coste_de_instalacion() / this.ahorro_anual_esperado();
    }

}



/**
 * Funcion para pruebas
 * @param {Calculadora} calc
 */
let probar = function (calc) {
    console.log({
        "Inputs": {
            "Consumo actual": calc.consumo_anual,
            "Porcentaje del consumo": calc.porcentaje_consumo,
            "Comunidad autonoma": calc.comunidad_autonoma,
            "Orientación del tejado": calc.orientacion_tejado
        },
        "Constantes": {
            "Coste_por_kWp": calc.coste_por_kWp,
            "Ahorro por kWh": calc.ahorro_p_kWh
        },
        "Variables": {
            "Producción de un pannel": calc.produccion_de_un_panel(),
        },
        "Outputs": {
            "Energia a cubrir": calc.energia_a_cubrir(),
            "Potencia necesaria a instalar": calc.potencia_necesaria_a_instalar(),
            "Coste de instalacion": calc.coste_de_instalacion(),
            "Ahorro anual esperado": calc.ahorro_anual_esperado(),
            "Factura mensual futura con paneles": "",
            "Años amortizacion": calc.anos_amortizacion(),
            "Emisiones": "",
        }
    });
};


/**
 * ZONA DE PRUEBAS Cambia la linea abajo 
 *  Calculadora(consumo_anual, porcentaje_consumo, provincia, orientacion_tejado)
 */

let calc1 = new Calculadora(5000, 80, "Almería", "Sur");

probar(calc1);

