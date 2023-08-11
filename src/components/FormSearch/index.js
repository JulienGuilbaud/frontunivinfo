import './style.scss';

export function FormSearch({ title,action,value,controlevalue }) {
    return (
        <>
            <form className='formSearch-container' onSubmit={action}>
                <fieldset className="formSearch-box">
                    <legend>Recherche</legend>
                    <article className="formSearch-card">
                        
                        <label><h2>{title}</h2>
                            <input className="formSearch-item-input" type="search" value={value} onChange={controlevalue}
                                placeholder={`Rechercher`} /></label>
                            <input className="formSearch-item-button" type="submit" value="rechercher" />
                    </article>
                </fieldset>
            </form>
        </>
    )
};
