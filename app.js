require('colors');

const {
    guardarDB,
    leerDB
} = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pause,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1': //crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2': //listar todas las tareas
                tareas.listadoCompleto();
                break;
            case '3'://listar tareas completadas
                tareas.listarPorEstado(true);
                break;
            case '4'://listar tareas pendientes
                tareas.listarPorEstado(false);;
                break;
            case '5'://completar tareas pendientes
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toogleCompletadas(ids);
                break;
            case '6'://borrar tarea
                const id = await listadoTareaBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar("Esta seguro que desea borrar?");
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;

            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pause();
    } while (opt !== '0');
}

main();