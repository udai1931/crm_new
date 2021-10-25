import SidenavHeader from '../src/dashboard/sidenavigation/header';
import { useToggle } from '../src/dashboard/provider/context';
import css from "../src/dashboard/sidenavigation/index.module.css";
import data from './salesData';
import { sideBarAtom } from '../state/state';
import { useRecoilState } from 'recoil';

const style = {
    mobilePosition: {
        left: 'left-0',
        right: 'right-0',
    },
    close: `hidden`,
    container: `pb-32 lg:pb-12`,
    open: `absolute w-8/12 z-40 sm:w-5/12`,
    default: `bg-body h-screen overflow-y-auto top-0 lg:flex lg:relative lg:w-64 lg:z-auto`,
};

const SideNavItemsStyle = {
    inactive: `text-gray-400`,
    active: `font-medium text-white`,
    link: `flex items-center justify-start my-2 p-4 text-sm w-full hover:text-white`,
};

export default function SideNavigation({ mobilePosition }) {
    const [select, setSelect] = useRecoilState(sideBarAtom);
    let handleClick = (title) => {
        console.log(title)
        setSelect(title)
        console.log(select)
    }

    const { open, ref } = useToggle();
    return (
        <aside
            ref={ref}
            className={`${style.default} ${style.mobilePosition[mobilePosition]} 
        ${open ? style.open : style.close} ${css.scrollbar}`}
        >
            <div className={style.container}>
                <SidenavHeader />
                <ul className="md:pl-6">
                    <li>
                        {
                            console.log(data)
                        }
                        {data.map((item) => (
                            <div
                                onClick={() => {
                                    handleClick(item.title)
                                }}
                                key={item.title}
                            >
                                <a
                                    href={item.link}
                                    className={`${SideNavItemsStyle.link} 
                                    ${item.title === select ? SideNavItemsStyle.active : SideNavItemsStyle.inactive}`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="mx-4">{item.title}</span>
                                </a>
                            </div>
                        ))}
                    </li>
                </ul>
            </div>
        </aside>
    );
}
