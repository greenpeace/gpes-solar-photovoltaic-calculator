# Calculadora de energía solar fotovoltaica

Calcula el ahorro energético a partir de datos sencillos introducidos en una página web.

- [Código fuente](./src/)
- [Pruebas unitárias](./spec/)
- [Test website](https://greenpeace.github.io/gpes-solar-photovoltaic-calculator/)

## Instalar

```javascript
npm install
```

## Correr las pruebas unitárias

### Una vez en el terminal

```javascript
npm test
```

### Servidor interactivo de pruebas

```javascript
npm run test-server
```

Después abrir el navegador en http://localhost:8888


## Deployment

```bash
npm run build:local
npm run build:prod
cp -R assets $HOME/Websites/es_greenpeace_org/code/wp-content/themes/guia-autoconsumo/
cp -R src $HOME/Websites/es_greenpeace_org/code/wp-content/themes/guia-autoconsumo/
```