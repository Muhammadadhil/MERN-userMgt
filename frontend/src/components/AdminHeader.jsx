import { Link } from "react-router-dom";

const AdminHeader = () => {
    return (
        <header className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    MERN App
                </Link>

                <nav className="hidden lg:flex lg:items-center lg:space-x-4">
                    <div className="relative">
                        <button className="flex items-center space-x-2">
                            <span>hello, admin</span>
                        </button>
                    </div>

                    <>
                        <Link to="" className="flex items-center space-x-1">
                            <span>dashboard</span>
                        </Link>
                        <Link to="" className="flex items-center space-x-1">
                            <span>dashboard</span>
                        </Link>
                    </>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
