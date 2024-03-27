# Explicación del proyecto:
Es un proyecto que empecé en Argelia (mi segundo país), ya que en este lugar no hay competencia en este tipo de páginas web.
Es una página web de compra/venta de segunda mano. El mismo modelo que Wallapop o Milanuncios, añadiendo funcionalidades de las dos páginas mencionadas más algunas funcionalidades propias.

# Proyecto basado en la solución MEAN Stack:
Significa MongoDB, Express.js, AngularJS y Node.js. MEAN es una pila JavaScript integral extensamente utilizada para aplicaciones preparadas para cloud.

# Como configurar el proyecto para visualizarlo en tu ordenador:

# Requisitos:
- Node.js
- MongoDB
- Angular CLI

# Instalación:
- Primero debemos instalar MongoDB con una configuración standard para usarlo en local: mongodb://localhost:27017
  
- Ejecutamos el servidor de MongoDB escribiendo en una consola windows:
  ```bash
  mongod
  ```
  Sí lo hemos configurado correctamente, el servidor de MongoDB debería de estar operativo.
  
- Abrimos una nueva consola y clonamos el proyecto:
   ```bash
    git clone https://github.com/AaronBaila/BonneOccasionFullStackMEAN.git
    ```
   
- Nos movemos al backend para configurarlo:
    ```bash
    cd BonneOccasionFullStackMEAN/backend
    ```
    
- Instalamos dependencias:
    ```bash
    npm install
    ```

- Iniciamos el servidor backend:
    ```bash
    npm run dev
    ```
    
- Abrimos una nueva consola dejando la del backend abierta:

- Nos movemos al frontend:
  ```bash
  cd frontend
  ```
  
- Instalamos Angular CLI si todavía no lo has hecho:
  ```bash
  npm install -g @angular/cli
  ```
  
- Instalamos dependencias:
  ```bash
  npm install
  ```
- Ejecutamos el frontend y mediante el parámetro "-o" le indicamos que abra el navegador web tras ejecutar el servidor:
  ```bash
  ng serve -o
  ```

# Cosas que funcionan:
- Registro de usuario.
- Login/logout.
- Subir un anuncio como usuario o como anónimo si no has iniciado sesión.
- Eliminar todos los anuncios que has publicado como usuario.
- Modificar los datos de tu usuario.
- Acceder a tus propios anuncios y editarlos como usuario.
- Editar/eliminar un anuncio como anónimo con el código de seguridad que te llega al correo (inspeccionar > consola. En el navegador para ver el código, ya que aún no está implementado el correo electrónico que envía los correos con el código).
- Filtrar por varios valores en la sección de "motor y accesorios" (Aún no funciona en las demás secciones).

# Cosas que no funcionan:
- Web responsive, la web aún no es responsive, si no se ve bien tienes que ajustar el zoom de la página (Ctrl + tecla "+" / "-").
- Envío de correo con código de seguridad para editar tus anuncios si lo has publicado como anónimo (sin iniciar sesión). En caso de probarlo, el código aparece en la consola del navegador tras hacer click en "editar anuncio". (presiona "f12 > consola" para acceder a la consola del navegador).
- Barra de búsqueda.
- Aplicar filtros aún no está programado en las secciones individuales como en la sección motos o propiedades (en la sección Motor y Accesorios si funciona).
- Chat entre usuarios registrados (A implementar, no hay ni backend ni frontend).
- Frontend no empezado en (la mayoria tienen un html basico y su funcioncionalidad en el backend): /login, /signup, /myposts, /editprofile, /motos, /properties, /bicycles, /smartphonestelephony, /tvaudiophoto, /computingelectronics, /jobs, /services, /fashion, /sportleisure, /consolesvideogames, /children, /homegarden, /homeappliances, /construction, /cinemabooksmusic, /others
