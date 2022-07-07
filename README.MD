# Una aplicación vulnerable para aplicar seguridad

### Cómo Desplegar aplicación Docker NodeJS en Heroku de forma local

Pasos:

Forkear el Repo


### Ahora vamos a Heroku

Crear cuenta, logearse y descargar heroku cli  https://id.heroku.com/

Luego en la terminal logearse

```
 heroku login
```
Login en heroku container
```
heroku container:login
```
Crear target de la aplicacion
```
heroku create <YOUR_APP_NAME>
```
Conectar git local en remote heroku 
```
heroku git:remote -a <YOUR_APP_NAME>
```
Build la imagen y push el container en Registry Heroku
```
heroku container:push web
```
Ejecute la image en la aplicacion
```
heroku container:release web
```
Verificar aplicacion node en el navegador
```
heroku open
```
Verificar Logs
```
heroku logs --tail
```

### Habilitar Api Key en Heroku para integrar con Github Actions

```
Desde la plataforma Heroku ir a -> Account setting y buscar ApliKey
```

### Para Desplegar la aplicacion desde Github Action , se tiene un template base en .github/worflows/deploy.yml

Donde se tiene que remplazar los siguientes datos

```
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "app-vulnerable2022" #Nombre de la app, creado anteriormente
          heroku_email: "roxsrossve@gmail.com"
          remote_branch: "master"
          usedocker: true
``` 
Ahora tienen que integrar herramientas de seguridad dentro del CICD

### Manos a la Obra

Demostración del funcionamiento de la aplicación https://app-vulnerable2022.herokuapp.com/
