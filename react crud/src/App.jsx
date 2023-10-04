import './assets/App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddForm from './Components/AddForm';


export default function App (){
  return (
    <>
        <BrowserRouter>
            <div className="container">
              <Routes> 
                  <Route path="/" element={<AddForm />} />
                  <Route path="/contact-list" element={< AddForm/>} />
                  <Route path="/edit-user/:id" element={<AddForm />} />
              </Routes>
            </div>
        </BrowserRouter>

    </>
  );
}



























// import './assets/App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AddForm from './Components/AddForm';
// import ListOfContact from './Components/ListOfContact';


// export default function App (){
//   return (
//     <>
//         <BrowserRouter>
//             <div className="container">
//               <Routes> 
//                   <Route path="/" element={<AddForm />} />
//                   <Route path="/contact-list" element={< ListOfContact/>} />
//                   <Route path="/edit-user/:id" element={<AddForm />} />
//               </Routes>
//             </div>
//         </BrowserRouter>

//     </>
//   );
// }





