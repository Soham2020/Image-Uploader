import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home () {
    const notify = () => toast("Wow so easy!");
    return (
        <>
            <h1>Home Page</h1>
            <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
        </>
    )
}