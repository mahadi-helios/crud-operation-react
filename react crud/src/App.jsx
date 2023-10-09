import './assets/App.css';
import './assets/Auth.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddContact from './Pages/AddContact';
import SingIn from './Auth/SingIn';
import SingUp from './Auth/SingUp';
import AllListOfContact from './Pages/AllListOfContact'


export default function App (){
  return (
    <>
        <BrowserRouter>
            <div className="container">
              <Routes>
                  <Route path="/" element={<SingIn />} />
                  <Route path="/singUp" element={<SingUp />} />
                  <Route path="/all-contact" element={<AllListOfContact />} />
                  <Route path="/contact-form" element={<AddContact />} />
                  <Route path="/contact-list" element={< AddContact/>} />
                  <Route path="/edit-user/:id" element={<AddContact />} />
              </Routes>
            </div>
        </BrowserRouter>

    </>
  );
}
















////////////////////////'''one componets use app.js ''''''''''''''''''''''''''''
// import './assets/App.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AddForm from './Components/AddForm';


// export default function App (){
//   return (
//     <>
//         <BrowserRouter>
//             <div className="container">
//               <Routes> 
//                   <Route path="/" element={<AddForm />} />
//                   <Route path="/contact-list" element={< AddForm/>} />
//                   <Route path="/edit-user/:id" element={<AddForm />} />
//               </Routes>
//             </div>
//         </BrowserRouter>

//     </>
//   );
// }


























//////////////////////''''''''''''''''''''pervious code'''''''''''''''''''''''''''''
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





