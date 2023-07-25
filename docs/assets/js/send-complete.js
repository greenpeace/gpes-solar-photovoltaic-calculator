/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Formats and sends form data to Hubspot
 * @param {object} formValues 
 * @returns {boolean}
 */
async function sendToHubspot(formValues, calculadora) {

    const first_name = formValues.first_name.trim();
    const last_name = formValues.last_name.trim();
    const email = formValues.email.trim();
    const id_number = formValues.id_number.replace(/[\.\s-,_\|#]/g, '').toUpperCase();
    const phone = formValues.phone_number.replace(/[\.\s-,_\|#]/g, '');

    const salesforce_campaign = "70108000000iSckAAE"; // FIXME api_forms_hubspot_salesforce_campaign_id // Fruta de temporada 
    const api_forms_hubspot_formId = "ba075237-2a48-4b98-8d3a-e3ee285b2110"; // Calculadora solar
    const postURL = "https://api.hsforms.com/submissions/v3/integration/submit/5361482/" + api_forms_hubspot_formId;

    const data = JSON.stringify({
        "fields": [{
                "name": "utm_campaign",
                "value": formValues.utm_campaign
            },
            {
                "name": "utm_source",
                "value": formValues.utm_source
            },
            {
                "name": "utm_medium",
                "value": formValues.utm_medium
            },
            {
                "name": "utm_content",
                "value": formValues.utm_content
            },
            {
                "name": "utm_term",
                "value": formValues.utm_term
            },
            {
                "name": "en_txn6",
                "value": formValues.gclid
            },
            {
                "name": "en_txn7",
                "value": formValues.ip
            },
            {
                "name": "en_txn8",
                "value": formValues.uagent
            },
            {
                "name": "last_abtest_variant__c",
                "value": document.getElementById('last_abtest_variant').value
            },
            {
                "name": "hs_language",
                "value": formValues.hs_language
            },
            {
                "name": "email",
                "value": email
            },
            {
                "name": "firstname",
                "value": first_name
            },
            {
                "name": "lastname",
                "value": last_name
            },
            {
                "name": "id_number",
                "value": id_number
            },
            {
                "name": "phone",
                "value": /^[89]\d{8}$/.test(phone) ? phone : ""
            },
            {
                "name": "mobilephone",
                "value": /^[67]\d{8}$/.test(phone) ? phone : ""
            },

            // Calculadora values
            {
                "name": "calculadora_consumo_anual",
                "value": calculadora.consumo_anual
            },
            {
                "name": "calculadora_porcentaje_consumo",
                "value": calculadora.porcentaje_consumo
            },
            {
                "name": "calculadora_provincia",
                "value": calculadora.provincia
            },
            {
                "name": "calculadora_orientacion_tejado",
                "value": calculadora.orientacion_tejado
            },
            {
                "name": "calculadora_ahorro_anual_esperado",
                "value": calculadora.ahorro_anual_esperado()
            },
            {
                "name": "calculadora_numero_paneles_a_instalar",
                "value": calculadora.numero_paneles_a_instalar()
            },
            {
                "name": "calculadora_potencia_necesaria_para_consumo_deseado",
                "value": calculadora.potencia_necesaria_para_consumo_deseado()
            },
            {
                "name": "calculadora_coste_de_tu_instalacion",
                "value": calculadora.coste_de_tu_instalacion()
            },
            {
                "name": "calculadora_anos_amortizacion",
                "value": calculadora.anos_amortizacion()
            },
            {
                "name": "calculadora_emissiones",
                "value": calculadora.emissiones()
            },

        ],
        "context": {
            "hutk": cookie_read("hubspotutk"),
            "pageUri": document.location.href,
            "pageName": document.title,
            "sfdcCampaignId": salesforce_campaign
        }
    });

    const rawResponse = await fetch(postURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    });

    const content = await rawResponse.json();

    if (rawResponse.ok) {
        trigger("signup", "form:submit", {
           was_contact : formValues.is_contact
        });
    } else {
        trigger("signup", "form:error", {});
    }

    return rawResponse.ok;

}