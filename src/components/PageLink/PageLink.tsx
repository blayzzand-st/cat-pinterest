import { NavLink } from 'react-router-dom';

type Props = {
  name: string;
  link: string;
};

const PageLink = ({ name, link }: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center justify-center px-4 py-2 md:py-6 ${isActive ? 'text-blue-50 bg-[#1E88E5]' : 'text-blue-200'}`
      }
      to={link}
    >
      {name}
    </NavLink>
  );
};

export default PageLink;
