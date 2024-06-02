# Control de ingresos unidades residenciales

Para crear la imagen de docker de la aplicación de Angular se debe correr el siguiente comando

```BASH
docker build -t angular-docker .
```

Para correr el contenedor se debe correr el siguiente comando

```BASH
docker run -p 4200:4200 angular-docker
```
