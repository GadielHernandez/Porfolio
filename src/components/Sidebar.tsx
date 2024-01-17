import { useEffect, useState } from 'react';
import './css/Sidebar.css';

export default function Sidebar(props: any) {
    const { initialSection } = props;
    const [currentSection, setCurrentSection] = useState(initialSection);

    useEffect(() => {
        const sections = [...document.querySelectorAll('section.section')].map(
            (section) => ({
                id: section.id,
                position: section.getBoundingClientRect(),
            })
        );

        function onScroll() {
            const delta = 100;
            const currentPosition = document.documentElement.scrollTop;
            let closestSection = sections.findIndex(
                (section) =>
                    currentPosition > section.position.y - delta &&
                    currentPosition < section.position.bottom - delta
            );

            if (closestSection === -1) return;

            setCurrentSection(closestSection);
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className="mt-16 sidebar">
            <ul>
                {props.sections.map((section: any, index: number) => (
                    <li
                        className={`${
                            currentSection === index && 'sidebar-active'
                        }`}
                        key={index}
                    >
                        <a
                            href={section.anchor}
                            className="group py-3 flex items-center"
                        >
                            <span>
                                {props.defaultIcon}
                                {props.activeIcon}
                            </span>
                            <span className="text-sm font-bold tracking-wider uppercase group-hover:text-white group-hover:ml-8 group-hover:translate-x-1 duration-150 leading-none ml-3 text">
                                {section.title}
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
