const { nanoid } = require('nanoid')
const books = require('./books');

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

//POST //Done
const addBooksHandler = (request, h) => {
    let {
        name,
        publisher,
        year,
        author,
        summary,
        pageCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    let finished = false;

    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    if (pageCount === readPage) {
        finished = true
    };

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });

        response.code(400);
        return response;
    };

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);
        return response;
    };

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
        insertedAt,
        updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.header('Access-Control-Allow-Origin', '*');
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });

    response.code(500);
    return response;
};

const filterData = async(datanya, model) => {
    jadi = [];
    await datanya.forEach((hasil) => { jadi.push({ id: hasil.id, name: hasil.name, publisher: hasil.publisher }) });
    if (model) {
        keyModel = Object.keys(model)[0];
        if (keyModel) {
            valueModel = Object.values(model)[0] || '';
            if (valueModel === "1") {
                nilai = true;
            } else if (valueModel === "0") {
                nilai = false;
            } else {
                nilai = valueModel.toLowerCase() || '';
            };

            console.log(`wow ${nilai} nilai dari => `, keyModel)
            abc = await jadi.filter(anu => anu[keyModel] === nilai);
            console.log(`Database =>`, jadi, `\nKey Object => ${keyModel}`, `\nValue Object => ${nilai}`, '\nHasil Filter =>', abc, '\n\n')
            return abc;
        };
    };
    return jadi;
};

//GET ALL //Done
const getAllBooksHandler = async(request, h) => {
    hasilFilter = await filterData(books, request.query);
    if (!hasilFilter) {
        hasilFilter = [];
    };
    booknya = { books: hasilFilter };
    // console.log("Dalam database", request.query, booknya, books)
    const response = h.response({
        status: 'success',
        data: booknya
    });
    return response;
};

//Get with ID Books //Done
const getBooksByIdHandler = (request, h) => {
    const { booksId } = request.params;
    const book = books.filter((n) => n.id === booksId)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

//PUT With ID BOOKs
const editBooksByIdHandler = (request, h) => {
    const { booksId } = request.params;
    const {
        name,
        publisher
    } = request.payload;
    let {
        year,
        author,
        summary,
        pageCount,
        readPage,
        reading
    } = request.payload;


    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });

        response.code(400);
        return response;
    };

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);
        return response;
    };

    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === booksId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBooksByIdHandler = (request, h) => {
    const { booksId } = request.params;

    const index = books.findIndex((book) => book.id === booksId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};
module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler };