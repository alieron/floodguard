import { collection, deleteDoc, doc, DocumentData, query as firestoreQuery, getDoc, getDocs, limit, orderBy, OrderByDirection, setDoc, updateDoc, where, WhereFilterOp } from 'firebase/firestore';
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

type WhereClause<T extends keyof CollectionPaths> = [
  Extract<keyof Omit<CollectionPaths[T], 'id'>, string>,
  WhereFilterOp,
  any
]
type OrderByClause<T> = [Extract<T, string>, OrderByDirection?]

export async function query<T extends keyof CollectionPaths>({
  collection: collectionPath,
  where: whereClause = [],
  orderBy: orderByClause,
  limit: limitClause = 1000
}: {
  collection: T
  where?: WhereClause<T>[] | WhereClause<T>
  orderBy?: OrderByClause<keyof Omit<CollectionPaths[T], 'id'>>
  limit?: number
}) {
  if (isSingleWhereClause(whereClause)) {
    whereClause = [whereClause];
  }

  const optionalQueryOptions = [
    ...whereClause.map(w => where(...w)),
    orderByClause ? orderBy(...orderByClause) : undefined
  ].filter(isNotUndefined);

  const q = firestoreQuery<any, DocumentData>(
    collection(db, collectionPath),
    ...optionalQueryOptions,
    limit(limitClause)
  );

  const result = await getDocs<CollectionPaths[T], DocumentData>(q);
  return result.docs.map(item => ({
    ...item.data(),
    id: item.id
  }));
}

function isNotUndefined<T>(val: T | undefined): val is T {
  return !!val;
}

function isSingleWhereClause(
  whereClause: WhereClause<any> | WhereClause<any>[]
): whereClause is WhereClause<any> {
  return whereClause.length > 0 && !Array.isArray(whereClause[0]);
}