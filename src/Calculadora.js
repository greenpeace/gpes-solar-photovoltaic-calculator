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

    /* ------------------------  INPUTS ------------------------ */

    /**
     * ¿Cual es tu consumo anual (KWH)?
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
     * @param {string} zona 
     * @returns {number}
     */
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
     * Devuelve la zona climática de la provincia
     * @param {string} provincia 
     * @returns {string}
     */
    zona_climatica_de_provincia(provincia) {
        const zonas_por_provincia = {
            'Almería': 'V',
            'Cádiz': 'IV',
            'Córdoba': 'V',
            'Granada': 'IV',
            'Huelva' : 'V',
            'Jaén' : 'IV',
            'Málaga' : 'IV',
            'Sevilla' : 'V',
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
            'Salamanca' : 'III',
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
            'Tenerife': 'V',
            'Lanzarote': 'V',
            'La Palma': 'V',
            'La Rioja': 'II',
            'Murcia': 'IV',
            'Álava': 'I',
            'Guipúzcoa': 'I',
            'Vizcaya': 'I',
            'Ceuta': 'V',
            'Melilla': 'V',
            'Navarra': 'II'
        };

        return zonas_por_provincia[provincia];
    }

    /**
     * Devuelve el coeficiente de la orientación del tejado
     * @returns {number}
     */
    coeficiente_orientacion_tejado(){
        const tabla_coeficientes = {
            Norte : 0,
            Sur : 1,
            Este : 0.83,
            Oeste : 0.83,
            Plano : 0.59
        };
        return tabla_coeficientes[this.orientacion_tejado];
    }

    /* ------------------------  OUTPUTS ------------------------ */

    

}



/**
 * Funcion para pruebas
 * @param {Calculadora} calc
 */
let probar = function (calc) {
    console.log({
        "Inputs": {
            "¿Cual es tu consumo anual (KWH)?": calc.consumo_anual,
            "¿Qué % de tu consumo quieres cubrir con autoconsumo solar?": calc.porcentaje_consumo,
            "¿Dónde vives? (provincia)": calc.comunidad_autonoma,
            "Tejado orientacion": calc.orientacion_tejado
        },
        "Constantes": {
            
        },
        "Variables": {
            "Energia a cubrir (kWh/year)": null,
        },
        "Outputs": {
            "Potencia necesaria de tu instalacion  para cubrir el consumo deseado (kWp)": null,
            "nº de paneles a instalar": null,
            "Coste de tu instalacion (€) (aproximado)": null,
            "Ahorro anual esperado (€)": null,
            "Factura mensual futura con paneles": null,
            "Años amortizacion ": null,
            "Emisiones": null,
        }
    });
};


/**
 * ZONA DE PRUEBAS Cambia la linea abajo 
 *  Calculadora(consumo_anual, porcentaje_consumo, provincia, orientacion_tejado)
 */

let calc1 = new Calculadora(5000, 80, "Almería", "Sur");

probar(calc1);

