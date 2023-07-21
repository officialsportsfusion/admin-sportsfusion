import { FaUser } from "react-icons/fa"
import { AiOutlineDelete } from "react-icons/ai"
import { FiEdit2 } from "react-icons/fi"
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export const Freetips = () => {
    const [tips, setTips] = useState('')
    const router = useRouter()
    const deletetip = async (tipId) => {
        try {
            await axios.delete(`https://teal-worried-adder.cyclic.app/v1/freetip/${tipId}`);
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
            const freetip = await axios.get('https://teal-worried-adder.cyclic.app/v1/freetip')
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
            <h1 className="text-app-orange font-bold text-4xl text-center mb-4">Fusion Free Tips</h1>

            <p className="text-center text-app-white max-w-2xl app-container">We provide free evaluated tips by experts daily from tipsters and sources all around the world, that will hlp you make better betting decisions and profits. They are basically free for all users.</p>

            <TipsTable tips={tips} deletetip={deletetip} />
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
                            <th className="hidden md:py-2 md:table-cell text-left pl-1 text-center">League</th>
                            <th className="py-2 text-left pl-1 text-center">Match</th>
                            <th className="py-2 text-center pl-1">Tips</th>
                            <th className="hidden py-2 md:table-cell text-center pl-1">Odds</th>
                            <th className="hidden py-2 text-center pl-1 md:table-cell">Tipster</th>
                            <th className=" hidden md:table-cell py-2 text-center">Scores</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tips && tips.length !== 0 ?
                                tips.map((tip, index) => {
                                    return <tr key={index} className="border-b-solid border-b-[#4E443D] border-b-[1px] last-of-type:border-none text-app-white">
                                        <td className="pl-2 text-center"><p className="inline-flex text-sm flex-col ml-1 min-[420px]:text-md min-[420px]:flex-row"><span>{tip.date}</span> <span className='mx-4'>{tip.time}</span></p></td>
                                        <td className="hidden md:table-cell text-center">{tip.league}</td>
                                        <td className='text-center'><span className="hidden sm:inline">{tip.match}</span><span className="sm:hidden">{tip.match}</span></td>
                                        <td className='text-center'>{tip.tip}</td>
                                        <td className="hidden md:table-cell text-center">{tip.odds}</td>
                                        <td className="hidden md:table-cell text-center"><FaUser className="text-app-orange inline mb-1" />{' '}{tip.tipster}</td>
                                        <td className="hidden md:table-cell text-center">{tip.scores}</td>
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