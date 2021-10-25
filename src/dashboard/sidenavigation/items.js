import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRecoilState } from "recoil";
import { sideBarAtom } from '../../../state/state';
import data from './data';

const style = {
  inactive: `text-gray-400`,
  active: `font-medium text-white`,
  link: `flex items-center justify-start my-2 p-4 text-sm w-full hover:text-white`,
};

export default function SidenavItems() {
  const [select,setSelect] = useRecoilState(sideBarAtom)
  const { asPath } = useRouter();
  let handleClick = (title) => {
    console.log(title)
    setSelect(title)
    console.log(select)
  }
  return (
    <ul className="md:pl-6">
      <li>
        {data.map((item) => (
          <div 
            href='/admin'
            onClick = {()=>{
             handleClick(item.title)
            }} 
            key={item.title}
          >
            <a
              className={`${style.link} 
               ${item.title === select ? style.active : style.inactive}`}
               style={{cursor:'pointer'}}
            >
              <span>{item.icon}</span>
              <span className="mx-4">{item.title}</span>
            </a> 
          </div>
        ))}
      </li>
    </ul>
  );
}
