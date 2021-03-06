const Tarea = require("./tarea");
const colors = require('colors');

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        delete this._listado[id];
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        console.log();
        this.mostrarPorConsola(this.listadoArr);
    }

    listarPorEstado(completadas = true) {
        let listado = completadas
            ? this.listadoArr.filter((e) => e.completadoEn)
            : this.listadoArr.filter((e) => !e.completadoEn);

        this.mostrarPorConsola(listado);
    }

    mostrarPorConsola(tareas = []) {
        tareas.forEach((tarea, indice) => {
            let estado = tarea.completadoEn ? colors.green(tarea.completadoEn) : "PENDIENTE".red;
            console.log(`${colors.green(indice + 1)}. ${tarea.desc} :: ${estado}`);
        })
    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    toogleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;