import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit2 } from "react-icons/fi"
import Link from "next/link";
import axios from 'axios';

export const Premiumtip = () => {
    const [Tip, setTips] = useState(null)
    const router = useRouter()
    const deletetip = async (tipId) => {
        try {
            await axios.delete(`https://teal-worried-adder.cyclic.app/v1/premium/${tipId}`);
            // Update the state to reflect the deleted tip
            setTips(Tip.filter((tip) => tip._id !== tipId));
            console.log("Tip deleted successfully");
        } catch (error) {
            console.error("Error deleting tip:", error);
            // Handle the error as needed
        }
    };

    async function getPremium() {
        try {
            let response = await axios.get('https://teal-worried-adder.cyclic.app/v1/premium')
            console.log(response.data)
           

            setTips(response.data)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
          // Redirect the user to the login page or display an access denied message
          // based on your application's requirements
          router.push('/'); // Replace '/login' with your login page path
        } else {
          getPremium();
        }
      },[] );
    return (
        <section className="bg-app-black py-12">
            <h1 className="text-app-orange font-bold text-4xl text-center mb-4">Fusion Premium</h1>

            <p className="text-center text-app-white max-w-2xl app-container">Pick from our exclusive well sorted premium tips from all our biggest tipsters daily at different prices. Very low risk to help you make more profits and better betting decisions. These tips are paid and bought from various tipsters and sources, then repurposed and sold at cheaper rates to our investors.</p>

            <Table Tip={Tip} deletetip={deletetip} />
        </section>
    )
}


const Table = ({ Tip, deletetip }) => {

    return (
        <div className="md:app-container">
            <table className="w-full mt-8 bg-[#1E2124] text-xs border-collapse min-[540px]:text-sm sm:text-base">
                <thead>
                    <tr className="text-app-white bg-app-orange w-full border-b-solid border-b-[#4E443D] border-b-[1px]">
                        <th className="py-3 pl-4">Date</th>
                        <th className="py-2 pl-1">Event</th>
                        <th className=" md:py-2 md:table-cell pl-1">Tipster</th>
                        <th className=" py-2 pl-1 md:table-cell">Tip</th>
                        {/* <th className="py-2">Tips & Odds</th> */}
                    </tr>
                </thead>

                <tbody>
                    {
                        Tip && Tip.length !== 0 ?
                            Tip.map((item, index) => {
                                return <tr key={index} className="border-b-solid border-b-[#4E443D] border-b-[1px] last-of-type:border-none">
                                    <td className="py-1 px-[2px] text-center border border-[#4E443D]"><p className="inline-flex flex-col min-[420px]:text-md"><span>{item.date}</span><span>{item.time}</span></p></td>

                                    <td className="p-1 text-center border border-[#4E443D] max-w-[12rem]"><p className="inline-flex flex-col ml-1 min-[420px]:text-md"><span className='text-[#AAAAAA]'>{item.match}</span><span>{item.league}</span></p></td>

                                    <td className="pl-2 text-center  border border-[#4E443D] md:table-cell"><p className="inline-flex flex-col ml-1 min-[420px]:text-md"><span className='text-[#AAAAAA]'>{item.tipster}</span></p></td>
                                    <td className="pl-2 text-center  border border-[#4E443D] md:table-cell"><p className="inline-flex flex-col ml-1 min-[420px]:text-md"><span className='text-[#AAAAAA]'>{item.tip}</span></p></td>
                                    <Link href={`/updatetip/premium/${item._id}`} passHref className='text-center ml-3'><FiEdit2 size={20}/> </Link>
                                   
                                    <button onClick={() => deletetip(item._id)} className='mt-3'><AiOutlineDelete size={20}/></button>
                                    {/* <Button onClick={() => deletetip(item._id)}>delete</Button> */}

                                </tr>
                            }) : null
                    }
                </tbody>
            </table>
        </div>
    )
}

const Button = ({ children, onClick }) => {
    return (
        <button className='bg-app-orange rounded-full py-1 px-4 sm:px-5 md:px-6' onClick={onClick}>{children}</button>
    )
}