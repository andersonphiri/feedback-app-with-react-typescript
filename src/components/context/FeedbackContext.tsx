import { createContext, ReactNode, useState, useEffect } from 'react';
import { listToHashMap, mapDeepCopy, OrNull } from '../../utils';
import { Feedback, FeedbackInterface } from '../FeedbackForm';
import { v4 as uuidv4 } from 'uuid';
import { FeedbackItemEditInterface } from '../FeedbackItem';


export interface FeedbackProviderModelInterface  {
    children ? : ReactNode,
    feedbacks?: OrNull<Map<string, FeedbackInterface>>,
    deleteFeedback ? : (id : string) => void,
    addFeedback  ? : (newFeedback: Feedback) => void,
    editFeedback ? : (item: OrNull<FeedbackItemEditInterface>) => void,
    feedbackEdit ? : FeedbackItemEditInterface,
    updateFeedback ? : (item: OrNull<FeedbackItemEditInterface>) => void,
    isLoading ?: boolean,
}
export const FeedbackContext = createContext<FeedbackProviderModelInterface>({  });
export const FeedbackProvider = ({children,} : FeedbackProviderModelInterface) =>{
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [feedback, setFeedback] = useState<OrNull<Map<string, FeedbackInterface>>>(null);
    const [feedbackEdit, setFeedbackEdit] = useState<FeedbackItemEditInterface>({ item:null, edit: false });

    useEffect( () => {
        fetchFeedback();
        // reloadData();
    }, []);
    const fetchFeedback = async () => {
        await reloadData();
    }

    const reloadData =  () : Promise<any> => {
        return new Promise(async resolve => {
            setIsLoading(true);
            await fetch(`/feedback?_sort=id&_order=desc`)
            .then(async response => {
                const data: FeedbackInterface[] = await response.json();
                console.log("data realoaded successfuly!");
                setFeedback(listToHashMap(data, item => item.id));
                
            }).catch(e => {
                console.error(`reload error from: ${e}`);
            }).finally (() => {
                setIsLoading(false);
            })
        });
    }

    const deleteFeedback = async  (id: string)  => {
        if (window.confirm(`are you sure you want to delete the item :  ${JSON.stringify(feedback?.get(id))} ?`)) {
            
            const deleteFeedbackCall = await fetch(`/feedback/${id}`, {
                method: 'DELETE'
            });
            if (deleteFeedbackCall.ok === true) {
                try {
                    const responseCall = await deleteFeedbackCall.json();
                    console.log(`delete response: ${responseCall} ` );
                    // load new
                    await reloadData();
                } catch (error) {
                    console.error(`error after delete: ${error}`);
                }
            } else {
                console.warn(`delete status ${deleteFeedbackCall.status}`);
            }
        }

    }
    const addFeedback = async (newFeedback: Feedback)  => {
        newFeedback.setId(uuidv4());
       await fetch('/feedback', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            }, 
            body: JSON.stringify(newFeedback)
        }
        ).then(async response =>{
            const data = await response.json();
            console.log(`addfeedback response: ${data}`)
            await reloadData();
        }).catch(e => console.error(e)
        );

    }

    const editFeedback = (item : OrNull<FeedbackItemEditInterface>)  => {
        if (!item || !item.item){
            return;
        }
        setFeedbackEdit({item : item.item , edit: true});
    }

    const updateFeedback = async (item: OrNull<FeedbackItemEditInterface>)  => {
        if (!item || !item.item ) {
            return;
        }
        // const fb = mapDeepCopy(feedback);
        // fb?.set(item.item.id, item.item);

        await fetch(`/feedback/${item.item.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item.item)
        }
        ).then(async response => {
            const data = await response.json();
            console.log(`edit feedback response: ${data}`)

           // setFeedbackEdit({edit: false});
           feedbackEdit.edit = false;
           // feedbackEdit.item?.text = ''
            setFeedbackEdit({ item: null, edit: false });

            await reloadData();
        }).catch(e => console.error(e)
        );
       // setFeedback(fb);
    }


    return <FeedbackContext.Provider value={{
        feedbacks: feedback,
        deleteFeedback: deleteFeedback,
        addFeedback: addFeedback,
        editFeedback: editFeedback,
        feedbackEdit: feedbackEdit,
        updateFeedback,
        isLoading,
    }}>
        {children}
    </FeedbackContext.Provider>
}