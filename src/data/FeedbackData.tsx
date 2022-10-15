import internal from "stream";
import { listToHashMap, OrNull } from "../utils";
import { v4 as uuidv4 } from 'uuid';

export interface FeedbackInterface {
    id: string,
    rating: number,
    text: string
}

export function feedbackInterfaceIdKey(item : FeedbackInterface) : string {
    return item.id;
}

const feedbackData : Array<FeedbackInterface> = [
    {
        id: uuidv4(),
        rating: 10,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
    },
    {
        id: uuidv4(),
        rating: 9,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
    },
    {
        id: uuidv4(),
        rating: 8,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. consequuntur vel vitae commodi alias voluptatem est voluptatum ipsa quae.',
    },
]

export const feedbackDataMap: OrNull<Map<string, FeedbackInterface>> = listToHashMap(feedbackData, feedbackInterfaceIdKey);
