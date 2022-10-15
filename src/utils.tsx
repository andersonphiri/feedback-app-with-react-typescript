export type OrNull<TType> = TType | null;
export function listToHashMap<TKey, TType>(items: TType[], uniqueKeyFunc: (item: TType) => TKey): OrNull<Map<TKey, TType>> {
    if (!items || items.length === 0) {
        return null;
    }
    const result = new Map<TKey, TType>();
    items.forEach((item, _) => {
        result.set(uniqueKeyFunc(item), item);
    })
    return result;
}

export function mapToArray<TKey, TType>(map: OrNull<Map<TKey, TType>>) : TType[] {
    if (!map) {
        return [];
    }
    const result : Array<TType> = [];  
    // TODO: map to arrays
     

    return result;
}

export function mapDeepCopy<TKey, TType>(map: OrNull<Map<TKey, TType>>): OrNull<Map<TKey, TType>> {
    const result = new Map<TKey, TType>();
    if (!map) {
        return result;
    } else {
        
        for (const iterator of map.entries()) {
            result.set( iterator[0], iterator[1] );
        }
    }
    return result;
}