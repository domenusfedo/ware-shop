import {db} from '../firebase'


const useOrders = () => {
    const getActiveOrder = async (id) => {
        const data = await db.firestore().collection('orders').doc(id).get().then(doc => doc.data());
        if(data === undefined || data === null) {
            return []
        }
        const newData = Object.keys(data).map(e => {
            if(data[e].status === 'new') {
                return {
                    data: data[e],
                    number: e
                }
            }
        });
        const filtered = newData.filter(x => x !== undefined);
        return filtered;
    }

    return {
        getActiveOrder
    }
};

export default useOrders;