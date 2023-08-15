import './style.scss';
export function Main ({title, children}) {
    return( 
    <>
    <main role="main" className='main-container'>
        <h1 id="title" className='main-item-title' tabIndex='0'>{title}</h1>
        <section className='main-box'>
            {children}
        </section>
    </main>
    </>
    );
}