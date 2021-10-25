import router from 'next/router';
import { useToggle } from '../provider/context';

export default function TopNavigation() {
  const { toggle } = useToggle();
  return (
    <header className="relative z-10 items-center w-full h-20 bg-body z-50">
      <div className="relative flex flex-col justify-center h-full px-3 mx-auto">
        <div className="relative flex items-center w-full pl-1 sm:ml-0 sm:pr-2 lg:max-w-68">
          <div className="relative left-0 flex w-3/4">
            <div className="relative flex items-center w-12 h-full group">
              <button
                type="button"
                aria-expanded="false"
                aria-label="Toggle sidenav"
                onClick={toggle}
                className="text-4xl text-white focus:outline-none lg:hidden"
              >
                &#8801;
              </button>
            </div>
          </div>
          <div className="relative flex items-center justify-end w-full p-1 ml-5 sm:mr-0 sm:right-auto">
            <button className="block pr-5  bg-gray-400 mr-5 text-center px-4 py-2 text-white font-extrabold rounded"
              onClick={() => {
                localStorage.removeItem('pepcoding_token');
                router.push('/Login');
              }}>
              Logout
            </button>
            <a href="#" className="relative block">
              <img
                alt="Enoch Ndika"
                src="/images/1.jpg"
                className="object-cover w-10 h-10 mx-auto rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
