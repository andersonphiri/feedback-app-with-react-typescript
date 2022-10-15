import FeedbackItem from "./components/FeedbackItem";
import FeedbackList, { FeedbackListInterface } from "./components/FeedbackList";
import Header from "./components/Header";
import {  feedbackDataMap, FeedbackInterface } from './data/FeedbackData'
import {useState} from 'react';
import { mapDeepCopy, OrNull } from "./utils";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm, { Feedback } from "./components/FeedbackForm";


// import {v4 as uuidv4} from 'uuid';
// import uuidv4 = require('uuid');
// import * as uuid from 'uuid/';

import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import { Link, NavLink } from 'react-router-dom';
import Post from "./components/Post";
import NotFound from "./components/shared/NotFound";
import NavigatedToExample from "./components/NavigatedToExample";
import { FeedbackProvider } from "./components/context/FeedbackContext";
export interface AppModel  { 
    message: string,
    feedBacks: FeedbackListInterface 
}




function App () {

    const [feedback, setFeedback] = useState<OrNull<Map<string, FeedbackInterface>>>(feedbackDataMap);
    const deleteFeedback = (id : string) : void => {
        if (window.confirm(`are you sure you want to delete the item :  ${JSON.stringify(feedback?.get(id))} ?`)) {
            const copy = mapDeepCopy(feedback);
            if (copy?.delete(id)) {
                setFeedback(copy);
            }
            // setFeedback(fb => {
            //     const fbc = fb;
            //     fbc?.delete(id);
            //     return (fbc); 
            // });
            
        }
        
    }
    
    return (
        <FeedbackProvider>

       
        <Router>
        <Header />
        <div className="container">
            <Routes>
                    <Route  path="/" element={
                        <>
                            <FeedbackForm  />
                            {/* <FeedbackStats feedbacks={feedback} /> */}
                            
                            <FeedbackStats  />

                            {/* <FeedbackList feedbacks={!feedback ? [] : [...feedback.values()]} handleDelete={deleteFeedback} /> */}
                                <FeedbackList   />
                        </>
                    }>
                        
                    </Route>


                    <Route path="/about" element={<AboutPage />}  />
                    <Route path="/post/:id/:name" element={<Post />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/navigatedtoexample" element={<NavigatedToExample />} />


            </Routes>

            <NavLink to={'/'} 
            style={(isActive) => ({color: isActive ? 'red' : 'blueviolet', background: isActive ? '#000' : 'yellow'})}> 
                        Home
            </NavLink>

            <AboutIconLink />
            
        </div>
        </Router>
        </FeedbackProvider>
        
    )
}
// framer-motion versin: 4.1.17 : https://www.framer.com/docs/animate-presence/
// https://subscription.packtpub.com/video/application-development/9781838645274/p6/video6_6/update-feedback-item
export default App;