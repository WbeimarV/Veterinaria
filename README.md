# Veterinaria Asíncrona

Este es un proyecto educativo desarrollado en **JavaScript puro** que simula un sistema de gestión para una veterinaria. Permite registrar dueños y mascotas, buscar, listar, actualizar estados de salud y eliminar mascotas mediante un menú interactivo en consola basado en `prompt` y `alert`.

## Descripción

El sistema simula operaciones básicas de una veterinaria, como:

- Registro de dueños
- Registro de mascotas
- Listado general de mascotas
- Búsqueda por nombre de mascota
- Actualización del estado de salud
- Eliminación de registros
- Consulta de mascotas por dueño

A diferencia de una versión sincrónica, aquí se incorporan **comportamientos asincrónicos simulados** usando `setTimeout`, `callbacks`, `promesas` y `async/await`, para representar procesos que podrían tardar más tiempo (como una consulta a base de datos o una llamada a una API).


## Tecnologías utilizadas

- **HTML5** – estructura básica para ejecutar el script en navegador
- **JavaScript (ES6+)** – lógica principal del sistema
- `setTimeout()` – simula retardos en operaciones asincrónicas
- **Callbacks, Promesas y async/await** – para demostrar distintos enfoques de asincronía
- `prompt()` / `alert()` / `console.log()` – para interacción básica con el usuario


## Aplicación de la asincronía

Este proyecto implementa asincronía en varios puntos del flujo del sistema para simular tiempos de espera reales:

| Operación                            | Técnica usada             
|--------------------------------------|---------------------------------
| Registro de dueño                    | Callback + `setTimeout()` 
| Registro de mascota                  | Callback + `setTimeout()`
| Búsqueda de mascota por nombre       | Promesa                   
| Eliminación de mascota               | Promesa + `setTimeout()` 
| Ver mascotas por cédula de dueño     | `async/await` + `setTimeout()`

Esta estructura permite mostrar de forma práctica cómo aplicar los principales patrones asincrónicos en JavaScript moderno.


##  Cómo probar el sistema

1. Abre el archivo `index.html` en cualquier navegador moderno.
2. Usa la consola y ventanas emergentes (`prompt`, `alert`) para interactuar.
3. Observa cómo se simulan demoras en operaciones como registro, búsqueda o actualización.

Este proyecto está pensado para uso educativo. No utiliza almacenamiento persistente, por lo que los datos se pierden al recargar la página.



## 📚 Autor

Este proyecto fue diseñado como una introducción práctica a la asincronía en JavaScript.

