import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { url } from '../App';
import { useNavigate } from 'react-router-dom';

function ListSong() {
    const [data, setData] = useState([]);
const navigate=useNavigate();
    const fetchSongs = async () => {
        try {

            const response = await axios.get(`${url}/api/song/list`);

            if (response.data.success) {
                setData(response.data.songs)
            }

        } catch (error) {
            console.log('error', error)
            toast.error("Song List Error");
        }
    }

    const removeSong = async (id) => {
        try {

            const response = await axios.delete(`${url}/api/song/remove/${id}`);

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchSongs();
            }

        } catch (error) {
            console.log('error', error)
            toast.error("Song Remove Error");
        }
    }

    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <div>
            <div className="m-2 flex text-center text-xl  justify-end" >

                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={() => navigate('/add-song')} >+ create</button>
            </div>

            <p>All Songs List</p>
            <hr />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center justify-items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Album</b>
                    <b>Duration</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center justify-items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.album}</p>
                            <p>{item.duration}</p>
                            <p className='font-bold cursor-pointer hover:text-red-500' onClick={() => removeSong(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListSong