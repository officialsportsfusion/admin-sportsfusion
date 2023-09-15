import { FaUser } from "react-icons/fa"
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit2 } from "react-icons/fi"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export const FreeAcca = () => {
    const [tips, setTips] = useState('')
    const router = useRouter()
    const deletetip = async (tipId) => {
        try {
            await axios.delete(`https://teal-worried-adder.cyclic.app/v1/accatip/${tipId}`);
            // Update the state to reflect the deleted tip
            setTips(tips.filter((tip) => tip._id !== tipId));
            console.log("Tip deleted successfully");
        } catch (error) {
            console.error("Error deleting tip:", error);
            // Handle the error as needed
        }
    };

    const fetchdata = async () => {
        try {
            const freetip = await axios.get('https://teal-worried-adder.cyclic.app/v1/accatip')
            const response = freetip.data
            console.log(response)
            setTips(response)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('jwtToken');
        if (!token) {
          router.push('/'); // Replace '/login' with your login page path
        } else {
          fetchdata();
        }
      }, [router]);


    return (
        <section className="bg-app-black py-12">
            <h1 className="text-app-orange font-bold text-4xl text-center mb-4">Series Tips</h1>

            <p className="text-center text-app-white max-w-2xl app-container">We provide free evaluated tips by experts daily from tipsters and sources all around the world, that will hlp you make better betting decisions and profits. They are basically free for all users.</p>
            <Table tips={tips}  deletetip={deletetip}/>
            {/* <TipsTable tips={tips} deletetip={deletetip} /> */}
        </section>
    )
}



const TipsTable = ({ tips, deletetip }) => {
    return (
        <div className="md:app-container">
            <div className="relative">
                <table className="w-full mt-8 bg-[#1E2124]">
                    <thead>
                        <tr className="text-app-white bg-app-orange w-full border-b-solid border-b-[#4E443D] border-b-[1px]">
                            <th className="py-2 text-left pl-4 text-center">Time</th>
                            <th className="hidden md:py-2 md:table-cell text-left pl-1 text-center">Category</th>
                            <th className="py-2 text-left pl-1 text-center">Stake</th>
                            <th className="py-2 text-center pl-1">Signup</th>
                            <th className="hidden py-2 md:table-cell text-center pl-1">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tips && tips.length !== 0 ?
                                tips.map((tip, index) => {
                                    return <tr key={index} className="border-b-solid border-b-[#4E443D] border-b-[1px] last-of-type:border-none text-app-white">
                                       <td className="py-1 px-[2px] text-center"><p className="gap-x-1 inline-flex flex-col min-[412px]:text-md min-[412px]:flex-row"><span>{tip.date}</span><span>{tip.time}</span></p></td>
                                    {/* <td className="hidden md:py-2 md:table-cell pl-1 text-center">{serie.time}</td> */}
                                    <td className=" py-2 pl-1 text-center">{tip.category}</td>
                                    <td className=" py-2 pl-1 md:table-cell text-[#AAAAAA] text-center"><a href={tip.gameLink}><button className="rounded-md h-6 w-12 text-sm bg-gray-500">stake</button></a></td>
                                    <td className=" py-2 pl-1 md:table-cell text-[#AAAAAA] text-center"><a href={tip.signupLink}><button className="rounded-md h-7 w-16 text-sm bg-gray-500">sign up</button></a></td>
                                    <td className="py-2 text-center pr-2"><Status won={tip.status} /></td>
                                        <Link href={`/updatetip/${tip._id}`} passHref> <FiEdit2 size={20}/> </Link>
                                        <button onClick={() => deletetip(tip._id)} className='mt-3'><AiOutlineDelete size={20}/></button>
                                    </tr>
                                }) : null
                        }
                    </tbody>
                </table>
                {/* <div className="bg-gradient-to-t from-[#0D0D0D] to-[#0D0D0D00] h-48 absolute bottom-0 left-0 right-0" /> */}
            </div>
            <div className="grid place-items-center pt-3">
                <button className='h-[2.25rem] w-[6.5rem] grid place-items-center bg-gradient-to-r from-app-orange via-app-sky to-app-orange p-[1px] rounded-lg cursor-pointer hover:p-[2px] text-app-white' ><span className='bg-app-black w-full h-full rounded-lg inline-grid place-items-center '>See More</span></button>
            </div>
        </div>
    )
}


const Table = ({ tips, deletetip }) => {
    return (
        <div className="md:app-container">
            <table className="w-full mt-8 bg-[#1E2124] text-xs border-collapse min-[540px]:text-sm sm:text-base">
                <thead>
                    
                    <tr className="text-app-white bg-app-orange w-full border-b-solid border-b-[#4E443D] border-b-[1px] ">
                            <th className="py-2 text-left pl-4 text-center">Time</th>
                            <th className="hidden md:py-2 md:table-cell text-left pl-1 text-center">Category</th>
                            <th className="py-2 text-left pl-1 text-center">Stake</th>
                            <th className="py-2 text-center pl-1">Signup</th>
                            <th className="hidden py-2 md:table-cell text-center pl-1">Status</th>
                        </tr>
                    
                </thead>

                <tbody>
                    {
                        tips && tips.length !== 0 ?
                            tips.map((serie, index) => {
                                return <tr key={index} className="border-b-solid border-b-[#4E443D] border-b-[1px] last-of-type:border-none">
                                  
                                  <td className="py-1 px-[2px] text-center"><p className="gap-x-1 inline-flex flex-col min-[412px]:text-md min-[412px]:flex-row"><span>{serie.date}</span><span>{serie.time}</span></p></td>
                                    {/* <td className="hidden md:py-2 md:table-cell pl-1 text-center">{serie.time}</td> */}
                                    <td className=" py-2 pl-1 text-center">{serie.category}</td>
                                    <td className=" py-2 pl-1 md:table-cell text-[#AAAAAA] text-center"><a href={serie.gameLink}><button className="rounded-md h-6 w-12 text-sm bg-[#1E2124] ">stake</button></a></td>
                                    <td className=" py-2 pl-1 md:table-cell text-[#AAAAAA] text-center"><a href={serie.signupLink}><button className="rounded-md h-7 w-16 text-sm bg-gray-500">sign up</button></a></td>
                                    <td className="py-2 text-center pr-2"><Status won={serie.status} /></td>
                                    <Link href={`/updatetip/acca/${serie._id}`} passHref> <FiEdit2 size={20}/> </Link>
                                    <button onClick={() => deletetip(serie._id)} className='mt-3'><AiOutlineDelete size={20}/></button>
                                </tr>
                            }) : null
                    }
                </tbody>
            </table>
        </div>
    )
}


const Status = ({ won }) => {
    if (won === null ) {
        return <button className="rounded-md h-6 w-12 text-sm bg-gray-500">N/A</button>;
      }else{
        return (
            <button className={`rounded-md h-6 w-12 text-sm ${won && won === true ? 'text-[#0C9700] border-solid border-[#0C9700] border-[1px]' : 'text-[#CE2E1C] border-solid border-[1px] border-[#CE2E1C]'}`}>{won && won === true ? 'WON' : 'LOSS'}</button>
        )
      }
   
}