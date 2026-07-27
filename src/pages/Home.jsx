import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
        <div className="bg-cover bg-[url(https://img.magnific.com/premium-photo/traffic-lights-street-illustration-images_926199-4266601.jpg)] h-screen pt-8 w-full bg-blue-950 flex justify-between flex-col" >
            <img className="w-16 ml-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/960px-Uber_logo_2018.svg.png" alt="" />
            <div className="bg-white py-4 pb-7 px-4">
                <h2 className="text-2xl font-bold">Get Started with Uber</h2>
                <Link to='/login' className="flex justify-center items-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home