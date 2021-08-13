import {db} from '../firebase'

const usePagination = () => {
    const setCurrentPage = (element, pages) => {
        const val = +element.target.value;
        if(val > pages) {
            return pages;
        }

        if(val < 1) {
            return 1;
        }

        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        
        return val;
    }

    const updateActualPage = (action, actualPage, pages) => {
        let actual = actualPage;

        if(action === 'increment') {
            actual += 1
        } else {
            actual -= 1
        }

        if(actual > pages) {
            return pages;
        }

        if(actual < 1){
            return 1;
        }

        if(window.innerWidth < 715) {
            window.scrollTo({
                top: 200,
                behavior: 'smooth'
            })
        }
        return actual;
    }

    const amount = async(url, perPage, filter) => {
        let pages;

        let query = await db.collection(url);
        if(filter) {query = query.where('collection', 'in', filter.collections);}
        
        
        await query.get().then(
            (snapshot) => {
                pages = snapshot.docs.length / perPage;
            });
        return Math.round(pages);
    }

    const paginateGood = (array, page_size, page_number) => {
        return array.slice(page_number * page_size, page_number * page_size + page_size);
    };


    const filter = async (url, filter, perPage, lastId, currPage) => {
        let query = await db.collection(url);

        if(filter.price.from === null) {
            filter.price.from = 0
        }
        if(filter.price.to === null) {
            filter.price.to = 1000
        }

        query = query.orderBy("id", "asc");
        query = query.where('collection', 'in', filter.collections);
        query = query.startAfter(lastId);
        
        let last;

        let items = 0;
        
        const modifiedData = await query.get()
        .then(data => data.docs.map(doc => {
            let tempData = {};
            if(+doc.data().price >= +filter.price.from && +doc.data().price <= +filter.price.to) {
                last = doc.data().id;
                tempData = doc.data();
                items++;
            }
            return tempData

        }))
        .then(data => {
            //if no data assign custom item to data
            const filtered = data.filter(value => Object.keys(value).length !== 0);
            const paginatedArray = paginateGood(filtered, perPage, (currPage - 1));

            const filteredData = {
                data: paginatedArray,
                lastId: last,
                pages: Math.round(items / perPage)
            }
            return filteredData;
        })

        return modifiedData
    }

    const fetch = async (url, actualPage, perPage) => {
        let partial = null;
        let lastId = actualPage * perPage;

        await db.collection(url)
        .orderBy("id", "asc")
        .startAt(lastId - (perPage - 1))
        .limit(perPage)
        .get()
        .then(data => {
            partial = data.docs.map(doc => doc.data());
        })
        return partial
    }

    return {
        amount: amount,
        fetch: fetch,
        setCurrentPage: setCurrentPage,
        updateActualPage: updateActualPage,
        filter: filter
    }
}

export default usePagination;


// let query = await db.collection(url);

// if(filter.price.from === null) {
//     filter.price.from = 0
// }
// if(filter.price.to === null) {
//     filter.price.to = 1000
// }

// //query = query.orderBy("price", "asc");

// query = query.orderBy("id", "asc").startAfter(lastId).where('collection', 'in', filter.collections)

// // price = orderBy("price", "asc").where('price', '>=', filter.price.from);

// //query = query.orderBy("price", "asc").where('price', '>=', filter.price.from);

// query = query.limit(perPage)

// // query = query.orderBy("price", "asc");
// // query = query.orderBy("id", "asc");
// // query = query.startAfter(lastId);

// // query = query.where('collection', 'in', filter.collections).where('price', '>=', filter.price.from).where('price', '<=', filter.price.to)
// // //query = query.where('price', '>=', filter.price.from)

// // query = query.limit(perPage)

// let last;

// const test = await query.get()
// .then(data => data.docs.map(doc => {
//     last = doc.data().id;
//     return doc.data()
// }))
// .then(data => {
//     //if no data assign custom item to data
//     console.log(data)
//     const filteredData = {
//         data: data,
//         lastId: last,
//     }
//     return filteredData;
// })

// return test