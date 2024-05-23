#Equipo 1 Gabriel, Franciso

# Requerimientos Técnicos del Proyecto [MySueno]

Este documento detalla los requerimientos técnicos necesarios para el proyecto MySueno, asegurando un entorno seguro y de alto rendimiento para el alojamiento del sitio web.

## Sistema Operativo
- Se requiere un servidor Linux, como Ubuntu Server, LinuxMint o Debian, debido a su amplia compatibilidad con tecnologías web modernas.

## Servidor Web
- Se debe instalar y configurar un servidor web, como Apache o Nginx, para servir las páginas web de manera eficiente y altamente configurable.

## Firewall
- Es imprescindible implementar medidas de seguridad, como un cortafuegos (firewall), para proteger el servidor contra posibles ataques. Además, se deben configurar adecuadamente los permisos de archivos y directorios.

## Protocolo HTTPS
- Se debe utilizar el protocolo HTTPS para todas las comunicaciones entre el navegador del usuario y el servidor, asegurando que los datos transmitidos estén cifrados y protegidos contra posibles ataques.

## Protocolos del Servidor
### Servidor Node.js (Express)
- Configurar Nginx como proxy inverso para redirigir el tráfico desde el puerto 80 (HTTP) o 443 (HTTPS) al puerto en el que está ejecutando Node.js.

### Servidor Nginx
- Puerto 80: Para tráfico HTTP.
- Puerto 443: Para tráfico HTTPS.

## MySQL
- Utilizar el puerto 3306, el puerto por defecto para MySQL.

## Certificado SSL/TLS
- Implementar un certificado SSL/TLS válido para garantizar la autenticidad del servidor y la privacidad de los datos transmitidos.

## VPN
- Se debe utilizar una red privada virtual (VPN) para garantizar una conexión segura entre el servidor y los usuarios finales, especialmente en ubicaciones remotas o no seguras.

## Velocidad de Red
- Se requiere una conexión a Internet de alta velocidad, con al menos 20 Mbps simétricos, para garantizar tiempos de carga rápidos y una experiencia de usuario fluida.

## Compatibilidad con Navegadores
- Asegurar que el sitio sea compatible con los navegadores web más populares, como Chrome, Firefox, Safari y Edge, para proporcionar una experiencia consistente para todos los usuarios.

## Escalabilidad
- El sitio debe tener la capacidad de crecer y adaptarse a medida que aumenta el tráfico y se agregan nuevas funcionalidades, considerando al menos 10 GB de almacenamiento.

## Actualizaciones de Seguridad
- Es crucial mantener actualizado el software del servidor y aplicar parches de seguridad regularmente para protegerlo contra vulnerabilidades.
