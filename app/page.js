import Navbar from "./components/Navbar"
import Link from "next/link"

export default function Home(){
  return(
    <div className="min-h-screen bg-background">
      <Navbar/>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20 sm:py-28">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 text-balance">
            Find Jobs in Mozambique 🇲🇿
          </h1>
          
          <p className="text-lg sm:text-xl text-foreground-light mb-12 max-w-2xl mx-auto text-balance">
            Connect with the best opportunities across Mozambique. Whether you&apos;re looking for work or hiring, TrampoMoz is your trusted platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/jobs" 
              className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-center"
            >
              Browse Jobs
            </Link>
            
            <Link 
              href="/post" 
              className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-surface transition-colors text-center"
            >
              Post a Job
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-surface rounded-lg">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-foreground-light mt-2">Active Jobs</p>
            </div>
            <div className="p-6 bg-surface rounded-lg">
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="text-foreground-light mt-2">Job Seekers</p>
            </div>
            <div className="p-6 bg-surface rounded-lg">
              <p className="text-3xl font-bold text-primary">100+</p>
              <p className="text-foreground-light mt-2">Companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
