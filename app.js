require('colors');

const { 
    guardarDB, 
    leerDB 
} = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pause, 
    leerInput 
} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');

console.clear();

const main = async() =>{

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if(tareasDB){
        
    }


    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': //crear tarea
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._listado);
                break;
            case '3':
                break;
            case '4':
                break;
            case '5':
                break;
            case '6':
                break;
        
            default:
                break;
        }

        guardarDB(tareas.listadoArr);

        await pause();
    } while (opt !== '0');
}

main();