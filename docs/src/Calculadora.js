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
        this.precio_medio_pannel = 1400;
        this.ahorrokWh = 0.271;
        this.ahorrokWhMercadoLibre = 0.271;
        this.co2_kWh = 0.16;
    }

    /* ------------------------  INPUTS ------------------------ */

    /**
     * ¿Cual es tu consumo anual (kWh)?
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
     * ¿Qué % de tu consumo quieres cubrir con autoconsumo solar?
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
     * ¿Dónde vives? (provincia)
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
            'Ibiza',
            'Formentera',
            'Santa Cruz de Tenerife',
            'Las Palmas',
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

    /**
     * Tejado orientacion
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

    /* ------------------------  VARIABLES INTERMÉDIAS ------------------------ */

    /**
     * Devuelve el valor para cada una de las 5 zonas climáticas
     * @returns {number}
     */
    valor_zona_climatica() {
        if (!['I', 'II', 'III', 'IV', 'V'].includes(this.zona_climatica_de_provincia())) {
            throw new Error("Zona climática invalida");
        }
        const tabla_valores = {
            I: 1100,
            II: 1460,
            III: 1607,
            IV: 1754,
            V: 1825
        };
        return tabla_valores[this.zona_climatica_de_provincia()];
    }

    /**
     * Devuelve la zona climática de la provincia
     * @returns {string}
     */
    zona_climatica_de_provincia() {
        const zonas_por_provincia = {
            'Almería': 'V',
            'Cádiz': 'IV',
            'Córdoba': 'V',
            'Granada': 'IV',
            'Huelva': 'V',
            'Jaén': 'IV',
            'Málaga': 'IV',
            'Sevilla': 'V',
            'Huesca': 'III',
            'Teruel': 'III',
            'Zaragoza': 'IV',
            'Asturias': 'I',
            'Cantabria': 'I',
            'Barcelona': 'II',
            'Girona': 'III',
            'Lleida': 'III',
            'Tarragona': 'III',
            'Albacete': 'I',
            'Ciudad Real': 'IV',
            'Cuenca': 'III',
            'Guadalajara': 'IV',
            'Toledo': 'IV',
            'Ávila': 'IV',
            'Burgos': 'II',
            'León': 'III',
            'Palencia': 'II',
            'Salamanca': 'III',
            'Segovia': 'III',
            'Soria': 'III',
            'Valladolid': 'II',
            'Zamora': 'III',
            'Madrid': 'IV',
            'Alicante': 'V',
            'Castellón': 'IV',
            'Valencia': 'IV',
            'Badajoz': 'V',
            'Cáceres': 'V',
            'A Coruña': 'I',
            'Lugo': 'II',
            'Ourense': 'II',
            'Pontevedra': 'I',
            'Mallorca': 'IV',
            'Menorca': 'IV',
            'Ibiza': 'IV',
            'Formentera': 'IV',
            'Santa Cruz de Tenerife': 'V',
            'Las Palmas': 'V',
            'La Rioja': 'II',
            'Murcia': 'IV',
            'Álava': 'I',
            'Guipúzcoa': 'I',
            'Vizcaya': 'I',
            'Ceuta': 'V',
            'Melilla': 'V',
            'Navarra': 'II'
        };

        return zonas_por_provincia[this.provincia];
    }

    /**
     * Devuelve el coeficiente de la orientación del tejado
     * @returns {number}
     */
    coeficiente_orientacion_tejado() {
        const tabla_coeficientes = {
            Norte: 0,
            Sur: 1,
            Este: 0.83,
            Oeste: 0.83,
            Plano: 1
        };
        return tabla_coeficientes[this.orientacion_tejado];
    }

    /* ------------------------  OUTPUTS ------------------------ */

    /**
     * Energia a cubrir (kWh/year)
     * esta columna no es output, solo sirve para el resto de calculos
     * @returns {number}
     */
    energia_a_cubrir() {
        return this.consumo_anual * this.porcentaje_consumo / 100;
    }

    /**
     * Potencia necesaria de tu instalacion  para cubrir el consumo deseado (kWp)
     * @returns {number}
     */
    potencia_necesaria_para_consumo_deseado() {
        if (this.coeficiente_orientacion_tejado() === 0) {
            return 0;
        }
        return this.energia_a_cubrir() / (this.coeficiente_orientacion_tejado() * this.valor_zona_climatica()) * 1.2;
    }

    /**
     * Nº de paneles a instalar
     * @returns {number}
     */
    numero_paneles_a_instalar() {
        if (this.coeficiente_orientacion_tejado() === 0) {
            return 0;
        }
        return Math.ceil(this.potencia_necesaria_para_consumo_deseado() * 1000 / 550);
    }

    /**
     * Coste de tu instalacion (€) (aproximado)
     * @returns {number}
     */
    coste_de_tu_instalacion() {
        if (this.coeficiente_orientacion_tejado() === 0) {
            return 0;
        }
        return Math.round(this.potencia_necesaria_para_consumo_deseado() * this.precio_medio_pannel);
    }

    /**
     * Ahorro anual esperado (€)
     * @returns {number}
     */
    ahorro_anual_esperado() {
        if (this.coeficiente_orientacion_tejado() === 0) {
            return 0;
        }
        return Math.round(this.energia_a_cubrir() * this.ahorrokWh);
    }


    /**
     * Ahorro anual esperado mercado libre (€)
     * @returns {number}
     */
    ahorro_anual_esperado_mercado_libre() {
        if (this.coeficiente_orientacion_tejado() === 0) {
            return 0;
        }
        return Math.round(this.energia_a_cubrir() * this.ahorrokWhMercadoLibre);
    }

    /**
     * Años amortizacion 
     * @returns {number}
     */
    anos_amortizacion() {
        if (this.coeficiente_orientacion_tejado() === 0 || this.porcentaje_consumo === 0) {
            return 0;
        }
        return Math.round(((this.coste_de_tu_instalacion() / this.ahorro_anual_esperado()) + Number.EPSILON) * 10) / 10;
    }

    /**
     * Emissiones
     * @returns {number}
     */
    emissiones() {
        if (this.coeficiente_orientacion_tejado() === 0) {
            return 0;
        }
        return this.energia_a_cubrir() * this.co2_kWh;
    }

}


/**
 * Funcion para pruebas
 * @param {Calculadora} calc
 */
let probar = function (calc) {
    console.log({
        "Inputs": {
            "¿Cual es tu consumo anual (kWh)?": calc.consumo_anual,
            "¿Qué % de tu consumo quieres cubrir con autoconsumo solar?": calc.porcentaje_consumo,
            "¿Dónde vives? (provincia)": calc.provincia,
            "Tejado orientacion": calc.orientacion_tejado
        },
        "Constantes (no visibles)": {
            "Precio médio del pannel": calc.precio_medio_pannel,
            "Ahorro kWh mercado libre": calc.ahorrokWhMercadoLibre,
            "Co2 por kWh": calc.co2_kWh
        },
        "Variables (no visibles)": {
            "Energia a cubrir (kWh/year)": calc.energia_a_cubrir(),
            "Zona climática": calc.zona_climatica_de_provincia(),
            "Valor zona climática": calc.valor_zona_climatica()
        },
        "Outputs": {
            "Potencia necesaria de tu instalacion  para cubrir el consumo deseado (kWp)": calc.potencia_necesaria_para_consumo_deseado(),
            "Nº de paneles a instalar": calc.numero_paneles_a_instalar(),
            "Coste de tu instalacion (€) (aproximado)": calc.coste_de_tu_instalacion(),
            "Ahorro anual esperado mercado libre (€)": calc.ahorro_anual_esperado_mercado_libre(),
            "Años amortizacion ": calc.anos_amortizacion(),
            "Emisiones": calc.emissiones(),
        }
    });
};


/**
 * ZONA DE PRUEBAS Cambia la linea abajo 
 *  Calculadora(consumo_anual, porcentaje_consumo, provincia, orientacion_tejado)
 */

// let calc1 = new Calculadora(3300, 100, "Toledo", "Sur");

let calc1 = new Calculadora(3200, 60, "Madrid", "Sur");

probar(calc1);

