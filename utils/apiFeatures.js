class APIFeatures{
    constructor(query,queryString)
    {
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        const queryData = { ...this.queryString }
        const excludeField = ['page', 'sort', 'limit', 'fields']
        excludeField.forEach(el => delete queryData[el])

        var queryStr = JSON.stringify(queryData)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query=this.query.find(JSON.parse(queryStr))
        return this;
    }

    sort(){
        if(this.queryString.sort)
        {
            var sortBy=this.queryString.sort.split(',').join(' ')
             this.query=this.query.sort(sortBy)
        }
        return this;
    }

    fields(){
        if(this.queryString.fields)
        {
            var field=this.queryString.fields.split(',').join(' ')
             this.query=this.query.select(field)
        }
        return this;
    }

    pagination(){
        var page=this.queryString.page*1||1;
        var limit=this.queryString.limit*1||100;
        var skip=(page-1)*limit
        this.query=this.query.skip(skip).limit(limit)
        return this;
    }
   
}
module.exports = APIFeatures;