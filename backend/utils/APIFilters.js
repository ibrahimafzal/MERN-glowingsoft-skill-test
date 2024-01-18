class APIFilters {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    // search method
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: `${this.queryStr.keyword}`,
                $options: 'i' // case insensitive
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this
    }

    // pagination

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.export = { APIFilters }