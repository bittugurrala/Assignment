import Link from "next/link"
export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Link href= "/login">
        <button className="bg-black p-4 rounded text-xl active:bg-gray-400">Click to Login</button>
      </Link>
    </div>
    
  )  
}
