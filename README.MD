# Una aplicación vulnerable para aplicar seguridad

### Cómo Desplegar la aplicación Docker NodeJS en Heroku 

Login en heroku cli  https://id.heroku.com/
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

Demostración del funcionamiento de la aplicación https://app-vulnerable2022.herokuapp.com/