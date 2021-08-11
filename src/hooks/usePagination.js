import {useState} from 'react';
import {db} from '../firebase'

const usePagination = () => {
    const [lastId, setLastId] = useState(0);

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

    const amount = async(url, perPage, additional) => {
        let pages;
        await db.collection(url).get().then(
            (snapshot) => {
                pages = snapshot.docs.length / perPage;
            });
        return pages;
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

    const filter = async (url, filter, perPage, actualPage) => {
        let query = await db.collection(url);

        if(filter.collections.length !== 0) {
            query = query.where('collection', 'in', filter.collections);
        } else {
            query = query.where('collection', 'in', ['coloren', 'classen', 'golden', 'wooden']);
        }

        query = query.orderBy("id", "asc");
        query = query.startAfter(lastId);
        query = query.limit(perPage);
        
        let last;
        
        const test = await query.get()
        .then(data => data.docs.map(doc => {
            console.log(doc.data().id);
            last = doc.data().id;
            return doc.data();
        }))
        .then(data => {
            setLastId(lastId);
            const filteredData = {
                data: data,
                lastId: last
            }
            console.log('IDIDID', lastId)
            return filteredData;
        })

        return test
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