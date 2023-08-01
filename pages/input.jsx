import { Input } from "../components/Input";
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

export default function Page() {
    return (
      <main className="min-h-screen text-app-white-500 bg-app-black p-8">
       <div className='bg-red-500 rounded-2xl w-10/12 '>
       <Input 
        placeholder='Enter Email' 
        type='email'
        name='email'
        className='w-11/12'

        
         />
        <button><RiEyeOffFill/> </button>
       </div>
      </main>
    );
  }