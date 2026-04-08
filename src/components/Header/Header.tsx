import { PageLink } from '../PageLink';

const Header = () => {
  return (
    <nav className="bg-[#2196F3] h-20 flex px-15 shadow-[1px_6px_5px_rgba(0,0,0,0.25)]">
      <PageLink name="Все котики" link="/" />
      <PageLink name="Любимые котики" link="/favorites"/>
    </nav>
  );
};

export default Header;