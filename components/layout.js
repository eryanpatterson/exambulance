import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'

export default function Layout({ children }) {
    return (
        <div className={utilStyles.container}>
            <header>
                <Image
                    priority
                    src="/images/exambulance.jpg"
                    className={utilStyles.borderCircle}
                    height={150}
                    width={150}
                    alt='Exambulance Logo'
                />
            </header>
            <main>{children}</main>
        </div>
    )
}