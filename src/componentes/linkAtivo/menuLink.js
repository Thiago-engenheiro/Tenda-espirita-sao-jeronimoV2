import { Link, useLocation } from 'react-router-dom'
import styles from './menulink.module.css';

export default function MenuLink ({children, to}) {

    const localizacao = useLocation();

    return (
        
        <>

            <Link className = {`
            
                ${styles.navegacaoLink}
                ${localizacao.pathname === to ? styles.aAtivo : ""}
            
            `} to={to}>
            
                {children}
            
            </Link>
            
        </>

    )

}