const getPagination = (page = 0, size) => {
    const limit = size ? +size : 8
    // page = +page
    if(page > 0) {
        page = page-1
    }
    const offset = page ? page * limit : 0;

    return {limit, offset}
}

const getPaginationData = (data, page, limit) => {
    const { count: totalItems, rows: products} = data
    const totalPages = Math.ceil(totalItems/limit)
    const currentPage = `${page}/${totalPages}`
    console.log(page, currentPage, "Z<<<< PAGE");
    
    return {totalItems, products, totalPages, currentPage, page}
};

module.exports = {
    getPagination,
    getPaginationData
}