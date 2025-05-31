import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// collection of data types with the 'id' field, the id field is 
// the indexer for a particular instance of the object in that collection
type CollectionPaths = {

};

export const getById = async <T extends keyof CollectionPaths>(
  collectionPath: T,
  recordId: string
) => {
  const result = await getDoc(doc(db, collectionPath, recordId));
  if (result.exists()) {
    return {
      id: result.id,
      ...result.data() // on the db side, we dont need to have a duplicate id
    } as CollectionPaths[T]
  }
}

export const addItem = async <T extends keyof CollectionPaths>(
  collectionPath: T,
  itemId: string,
  item: Omit<CollectionPaths[T], 'id'>
) => {
  return await setDoc(doc(db, collectionPath, itemId), item); // as FirestoreCollectionPaths[T]
}

export const updateItem = async <T extends keyof CollectionPaths>(
  collectionPath: T,
  itemId: string,
  item: Partial<Omit<CollectionPaths[T], 'id'>> // data with the id, omit the id field
) => {
  return await updateDoc(doc(db, collectionPath, itemId), item);
}

export const deleteItem = async <T extends keyof CollectionPaths>(
  collectionPath: T,
  itemId: string
) => {
  return await deleteDoc(doc(db, collectionPath, itemId));
}