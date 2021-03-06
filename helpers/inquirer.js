const inquirer = require('inquirer');
const colors = require('colors');

const inquirerMenu = async() => {

    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: 'Que desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1'.green}. Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2'.green}. Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3'.green}. Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${'4'.green}. Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${'5'.green}. Completar tarea`
                },
                {
                    value: '6',
                    name: `${'6'.green}. Borrar tarea`
                },
                {
                    value: '0',
                    name: `${'0'.green}. Salir`
                }

            ]
        }
    ];

    console.clear();
    console.log('========================================'.green);
    console.log('Selecciona una opcion'.white );
    console.log('========================================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pause = async() => {
    let preguntas = [
        {
            type: 'input',
            name: 'tecla',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ];
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const leerInput = async (message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoTareaBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, indice) => {
        return{
            value: tarea.id,
            name: `${colors.green(indice + 1)}. ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Cual tarea desea borrar?',
            choices
        }];
    
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) =>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, indice) => {
        return {
            value: tarea.id,
            name: `${colors.green(indice + 1)}. ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu, 
    pause,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoChecklist
}