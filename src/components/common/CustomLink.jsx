import { Link } from 'react-router'

const LinkButton = ({children,to, ...rest}) => {
    return<Link
            to={to}
        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
        {...rest}
          >
           {children}
          </Link>
}

export default LinkButton