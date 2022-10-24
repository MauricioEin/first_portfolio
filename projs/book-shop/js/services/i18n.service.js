'use strict'

const gTrans = {
    'title': {
        en: 'Book Shop Manager',
        es: 'Inventario de Libros',
        he: 'ניהול מלאי הספרים'
    },
    'txt-filter-placeholder': {
        en: '🔎 Search by name',
        es: '🔎 Busque por nombre',
        he: '🔎 הקלידו את שם הספר',
    },
    'max-price-label': {
        en: 'Maximum Price',
        es: 'Precio Maximo',
        he: 'מחיר מקסימלי',
    },
    'min-rate-label': {
        en: 'Minimum Rate',
        es: 'Calificacion Minima',
        he: 'דירוג מינימלי'
    },
    'table-view-btn': {
        en: 'Table',
        es: 'Tabla',
        he: 'טבלה',
    },
    'cards-view-btn': {
        en: 'Cards',
        es: 'Cartas',
        he: 'פריטים',
    },
    'add-book-btn': {
        en: 'Add a Book',
        es: 'Añadir un libro',
        he: 'הוספת ספר',
    },
    'prev-page-btn': {
        en: 'Previous Page',
        es: 'Pagina Anterior',
        he: 'לעמוד הקודם',
    },
    'next-page-btn': {
        en: 'Next Page',
        es: 'Pagina Siguiente',
        he: 'לעמוד הבא',
    },
    'datafield-id': {
        en: 'Id',
        es: 'Codigo',
        he: 'מק"ט'
    },
    'datafield-name': {
        en: 'Name',
        es: 'Titulo',
        he: 'שם'
    },
    'datafield-price': {
        en: 'Price',
        es: 'Precio',
        he: 'מחיר'
    },
    'datafield-rate': {
        en: 'Rate',
        es: 'Calificacion',
        he: 'דירוג'
    },
    'datafield-actions': {
        en: 'Actions',
        es: 'Acciones',
        he: 'פעולות'
    },
    'action-btn-read': {
        en: 'read',
        es: 'ver',
        he: 'צפייה'
    },
    'action-btn-update': {
        en: 'update',
        es: 'actualizar',
        he: 'עדכון'
    },
    'action-btn-delete': {
        en: 'delete',
        es: 'borrar',
        he: 'מחיקה'
    },
    'modal-id': {
        en: 'Book Id',
        es: 'Codigo',
        he: 'מק"ט'
    },
    'close-modal-btn': {
        en: 'Close',
        es: 'Cerrar',
        he: 'סגירה'
    },
    'save': {
        en: 'Save',
        es: 'Guardar',
        he: 'שמירה'
    },
    'cancel': {
        en: 'Cancel',
        es: 'Cancelar',
        he: 'ביטול'
    },
    'new-price': {
        en: 'New Price:',
        es: 'Nuevo Precio:',
        he: 'מחיר חדש:'
    },
    'update-book-price': {
        en: 'Update Price',
        es: 'Actualizacion de Precio',
        he: 'עדכון מחיר'
    }

}

var gCurrLang = 'he'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'

    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    return trans
}

function setLang(lang) {
    gCurrLang = lang
}

