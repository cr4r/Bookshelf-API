const { addNoteHandler, getAllbooksHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

/*
{
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}
*/

const routes = [{
        method: 'POST',
        path: '/books',
        handler: addNoteHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllbooksHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getNoteByIdHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteNoteByIdHandler
    },
];

module.exports = routes;