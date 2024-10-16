# TRABAJO PRÁCTICO: 
## Aplicación de principios SOLID en un Servidor REST

### Escenario
Se va a desarrollar una API REST para una concesionaria de vehículos que gestiona tanto vehículos como clientes. Los vehículos tienen propiedades como id, marca, modelo, año y precio, mientras que los clientes tienen id, nombre, email y teléfono. La API debe seguir los principios SOLID para que sea mantenible, escalable y modular.

### Requisitos del TP:
1. Single Responsibility Principle (SRP):
 Crear clases separadas para los Controladores, Servicios y Repositorios de
vehículos y clientes.
 Cada clase debe tener una única responsabilidad. Los controladores manejan las
solicitudes HTTP, los servicios manejan la lógica de negocio y los repositorios la
interacción con la base de datos (simulada).

2. Open/Closed Principle (OCP):
 Extiende el sistema para que puedas agregar nuevas funcionalidades como aplicar
descuentos en los precios de vehículos sin modificar la clase VehicleService
original.

3. Liskov Substitution Principle (LSP):
 Implementa dos repositorios diferentes para manejar vehículos: uno simulado
para MongoDB y otro para PostgresSQL. Ambas implementaciones deben poder
ser utilizadas sin modificar los servicios.
4. Interface Segregation Principle (ISP):
 Define interfaces separadas para las operaciones de vehículos y clientes. No
mezcles las responsabilidades de manejo de vehículos con las de los clientes en
una sola interfaz.

5. Dependency Inversion Principle (DIP):
 Asegúrate de que los servicios de vehículos y clientes dependan de interfaces y no
de implementaciones concretas para el acceso a los datos.

### Instrucciones
1. Paso 1: Crear las Interfaces

 Define las interfaces IVehicleRepository y IClientRepository. Estas interfaces de-
ben tener los métodos create, findById, update, y delete.

2. Paso 2: Implementar los Modelos
 Crea los modelos IVehicle y IClient con propiedades como id, marca, modelo, año,
precio para vehículos e id, nombre, email, teléfono para clientes.

3. Paso 3: Implementar los Repositorios
 Implementa un repositorio para MongoDB y otro para PostgresSQL para manejar
vehículos, ambos deben implementar la interfaz IVehicleRepository.
 Implementa un repositorio para manejar clientes siguiendo el mismo patrón.

4. Paso 4: Implementar los Servicios
 Crea el servicio VehicleService que dependa de IVehicleRepository para manejar
la lógica de creación, búsqueda y actualización de vehículos.
 Crea el servicio ClientService que dependa de IClientRepository para manejar
clientes.

5. Paso 5: Implementar los Controladores
 Crea los controladores VehicleController y ClientController que usen los servicios
correspondientes para manejar las solicitudes HTTP (POST, GET, etc.).

6. Paso 6: Extender Funcionalidades
 Extiende VehicleService para agregar la funcionalidad de aplicar descuentos sin
modificar la clase original.

### IMPORTANTE:
La configuración del servidor express debe estar formato de Clase como se ha visto en
actividades anteriores.

### Presentación:
Crear un repositorio en GitHub y adjuntar la solución en Classroom, en la actividad indicada por el equipo docente.