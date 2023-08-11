import './style.scss';


export function DeleteButton({ value }) {
    return (
        <div className='delete-button-contenair'>
          <button className='delete-button-item'>{value}</button>     
        </div>
      )
 }